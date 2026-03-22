import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, tap } from 'rxjs';

export interface ReleaseInfo {
  version: string;
  publishedAt: Date;
  assets: { name: string; url: string; sizeMB: number }[];
}

interface VersionJson {
  version: string;
  publishedAt: string;
  assets: { name: string; url: string; sizeMB: number }[];
}

const CACHE_KEY = 'clarity_latest_release';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

@Injectable({ providedIn: 'root' })
export class GithubReleaseService {
  private http = inject(HttpClient);

  getLatestRelease(): Observable<ReleaseInfo | null> {
    const cached = this.getCache();
    if (cached) return of(cached);

    return this.http.get<VersionJson>('/version.json').pipe(
      map((data) => ({
        version: data.version,
        publishedAt: new Date(data.publishedAt),
        assets: data.assets,
      })),
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
