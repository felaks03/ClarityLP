import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, tap } from 'rxjs';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
}

export interface ReleaseInfo {
  version: string;
  publishedAt: Date;
  assets: { name: string; url: string; sizeMB: number }[];
}

const CACHE_KEY = 'clarity_latest_release';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

@Injectable({ providedIn: 'root' })
export class GithubReleaseService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.github.com/repos/felaks03/Clarity/releases/latest';

  getLatestRelease(): Observable<ReleaseInfo | null> {
    const cached = this.getCache();
    if (cached) return of(cached);

    return this.http.get<GitHubRelease>(this.apiUrl).pipe(
      map((release) => this.mapRelease(release)),
      tap((info) => this.setCache(info)),
      catchError(() => of(null)),
    );
  }

  private mapRelease(release: GitHubRelease): ReleaseInfo {
    return {
      version: release.tag_name.replace(/^v/, ''),
      publishedAt: new Date(release.published_at),
      assets: release.assets.map((a) => ({
        name: a.name,
        url: a.browser_download_url,
        sizeMB: Math.round(a.size / (1024 * 1024)),
      })),
    };
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
      // storage full or unavailable — ignore
    }
  }
}
