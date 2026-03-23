import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, tap } from 'rxjs';

export interface ReleaseInfo {
  version: string;
  publishedAt: Date;
  assets: { name: string; url: string; sizeMB: number }[];
}

interface GithubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GithubRelease {
  tag_name: string;
  published_at: string;
  assets: GithubAsset[];
}

const CACHE_KEY = 'clarity_latest_release';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const GITHUB_API = 'https://api.github.com/repos/felaks03/ClarityLP/releases/latest';

@Injectable({ providedIn: 'root' })
export class GithubReleaseService {
  private http = inject(HttpClient);

  getLatestRelease(): Observable<ReleaseInfo | null> {
    const cached = this.getCache();
    if (cached) return of(cached);

    return this.http.get<GithubRelease>(GITHUB_API).pipe(
      map((release) => {
        const version = release.tag_name.replace(/^v/, '');
        const assets = release.assets
          .filter((asset) => {
            // Excluir metadata y source code
            if (asset.name.endsWith('.yml')) return false;
            if (asset.name.startsWith('Source')) return false;
            return true;
          })
          .map((asset) => ({
            name: asset.name,
            url: asset.browser_download_url,
            sizeMB: Math.round(asset.size / (1024 * 1024) * 10) / 10,
          }));
        return {
          version,
          publishedAt: new Date(release.published_at),
          assets,
        };
      }),
      tap((info) => this.setCache(info)),
      catchError(() => of(null)),
    );
  }

  private getCache(): ReleaseInfo | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return { ...data, publishedAt: new Date(data.publishedAt) };
    } catch {
      return null;
    }
  }

  private setCache(info: ReleaseInfo): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: info, ts: Date.now() }));
    } catch {
      // storage full or unavailable
    }
  }
}
