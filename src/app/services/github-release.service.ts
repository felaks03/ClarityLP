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

// Fallback release data if API fails or repo is private
const FALLBACK_RELEASE: ReleaseInfo = {
  version: '0.1.0',
  publishedAt: new Date('2026-03-22'),
  assets: [
    {
      name: 'Clarity Setup 0.1.0.exe',
      url: '/downloads/Clarity%20Setup%200.1.0.exe',
      sizeMB: 98,
    },
    { name: 'Clarity-0.1.0.dmg', url: '/downloads/Clarity-0.1.0.dmg', sizeMB: 115 },
    {
      name: 'Clarity-0.1.0-mac.zip',
      url: '/downloads/Clarity-0.1.0-mac.zip',
      sizeMB: 115,
    },
    {
      name: 'clarity_0.1.0_amd64.deb',
      url: '/downloads/clarity_0.1.0_amd64.deb',
      sizeMB: 93,
    },
    {
      name: 'clarity-0.1.0.x86_64.rpm',
      url: '/downloads/clarity-0.1.0.x86_64.rpm',
      sizeMB: 93,
    },
    {
      name: 'clarity-0.1.0.pacman',
      url: '/downloads/clarity-0.1.0.pacman',
      sizeMB: 93,
    },
    {
      name: 'Clarity-0.1.0.AppImage',
      url: '/downloads/Clarity-0.1.0.AppImage',
      sizeMB: 119,
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class GithubReleaseService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.github.com/repos/felaks03/Clarity/releases/latest';

  getLatestRelease(): Observable<ReleaseInfo | null> {
    const cached = this.getCache();
    if (cached) {
      console.debug('[Clarity] Using cached release:', cached.version);
      return of(cached);
    }

    console.debug('[Clarity] Fetching latest release from GitHub API...');
    return this.http.get<GitHubRelease>(this.apiUrl).pipe(
      map((release) => {
        console.debug('[Clarity] GitHub API response:', release.tag_name);
        return this.mapRelease(release);
      }),
      tap((info) => {
        console.debug('[Clarity] Caching release:', info.version);
        this.setCache(info);
      }),
      catchError((error) => {
        console.warn('[Clarity] Failed to fetch from GitHub API, using fallback:', error.status);
        return of(FALLBACK_RELEASE);
      }),
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
      if (Date.now() - ts > CACHE_TTL) {
        console.debug('[Clarity] Cache expired');
        return null;
      }
      console.debug('[Clarity] Using cached release:', data.version);
      return { ...data, publishedAt: new Date(data.publishedAt) };
    } catch (e) {
      console.warn('[Clarity] Cache read error:', e);
      return null;
    }
  }

  private setCache(info: ReleaseInfo): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: info, ts: Date.now() }));
    } catch (e) {
      console.warn('[Clarity] Cache write error:', e);
    }
  }
}
