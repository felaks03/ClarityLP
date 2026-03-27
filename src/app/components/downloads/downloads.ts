import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { GithubReleaseService, ReleaseInfo } from '../../services/github-release.service';

interface DownloadOption {
  platform: string;
  label: string;
  fileName: string;
  url: string;
  size: string;
  icon: string;
  note: string;
  primary: boolean;
}

type DetectedPlatform = 'windows' | 'macos' | 'linux' | null;

/** Maps GitHub Release asset names to download card metadata */
const ASSET_MAP: {
  match: (name: string) => boolean;
  platform: string;
  label: string;
  icon: string;
  note: string;
  primary: boolean;
}[] = [
  {
    match: (n) => n.endsWith('.exe'),
    platform: 'windows',
    label: 'Download for Windows',
    icon: 'bi-windows',
    note: 'Installer will prompt for admin permissions',
    primary: true,
  },
  {
    match: (n) => n.endsWith('.dmg'),
    platform: 'macos',
    label: 'Download for macOS',
    icon: 'bi-apple',
    note: 'Unsigned build — right-click > Open on first launch. The .dmg includes a drag-to-Applications shortcut',
    primary: true,
  },
  {
    match: (n) => n.endsWith('-mac.zip'),
    platform: 'macos',
    label: 'Download .zip (macOS)',
    icon: 'bi-apple',
    note: 'Fallback if .dmg is unavailable — unzip and drag Clarity.app to Applications',
    primary: false,
  },
  {
    match: (n) => n.endsWith('.deb'),
    platform: 'linux',
    label: 'Download .deb (Debian/Ubuntu)',
    icon: 'bi-ubuntu',
    note: 'Para Debian, Ubuntu, Linux Mint, Pop!_OS',
    primary: false,
  },
  {
    match: (n) => n.endsWith('.rpm'),
    platform: 'linux',
    label: 'Download .rpm (Fedora/RHEL)',
    icon: 'bi-filetype-raw',
    note: 'Para Fedora, RHEL, CentOS, openSUSE',
    primary: false,
  },
  {
    match: (n) => n.endsWith('.pacman'),
    platform: 'linux',
    label: 'Download .pacman (Arch)',
    icon: 'bi-box',
    note: 'Para Arch Linux, Manjaro, EndeavourOS',
    primary: false,
  },
  {
    match: (n) => n.endsWith('.AppImage'),
    platform: 'linux',
    label: 'Download AppImage',
    icon: 'bi-box-arrow-down',
    note: 'Portable — funciona en cualquier distro sin instalar',
    primary: false,
  },
];

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class DownloadsComponent implements OnInit {
  private releaseService = inject(GithubReleaseService);

  detectedPlatform: DetectedPlatform = null;
  showAll = false;
  copied = false;
  version = '';
  lastUpdated = '';
  loading = true;

  downloads: DownloadOption[] = [];

  /** The Linux install.sh card is always present (hosted on the LP, not GitHub Releases) */
  private readonly linuxInstallCard: DownloadOption = {
    platform: 'linux',
    label: 'Install on Linux',
    fileName: 'install.sh',
    url: '/install.sh',
    size: 'Auto-detect',
    icon: 'bi-terminal',
    note: 'Detects tu distro e instala el paquete correcto automáticamente',
    primary: true,
  };

  get sortedDownloads(): DownloadOption[] {
    if (!this.detectedPlatform) return this.downloads;
    return [...this.downloads].sort((a, b) => {
      const aMatch = a.platform === this.detectedPlatform ? -1 : 0;
      const bMatch = b.platform === this.detectedPlatform ? -1 : 0;
      return aMatch - bMatch;
    });
  }

  get visibleDownloads(): DownloadOption[] {
    if (this.showAll) return this.sortedDownloads;
    if (this.detectedPlatform) {
      const filtered = this.sortedDownloads.filter((d) => d.platform === this.detectedPlatform && d.primary);
      if (filtered.length > 0) return filtered;
    }
    // Fallback: show all primary if no detection or no matches found
    return this.sortedDownloads.filter((d) => d.primary);
  }

  ngOnInit() {
    this.detectedPlatform = this.detectPlatform();
    this.releaseService.getLatestRelease().subscribe((release) => {
      this.loading = false;
      if (release) {
        this.applyRelease(release);
      }
    });
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  isDetected(platform: string): boolean {
    return this.detectedPlatform === platform;
  }

  copyInstallCmd() {
    navigator.clipboard.writeText('curl -fsSL https://getclaritybrowser.com/install.sh | bash');
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }

  private applyRelease(release: ReleaseInfo): void {
    this.version = release.version;
    this.lastUpdated = release.publishedAt.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const cards: DownloadOption[] = [this.linuxInstallCard];

    for (const asset of release.assets) {
      const mapping = ASSET_MAP.find((m) => m.match(asset.name));
      if (!mapping) continue;
      cards.push({
        platform: mapping.platform,
        label: mapping.label,
        fileName: asset.name,
        url: asset.url,
        size: `${asset.sizeMB} MB`,
        icon: mapping.icon,
        note: mapping.note,
        primary: mapping.primary,
      });
    }

    this.downloads = cards;
  }

  private detectPlatform(): DetectedPlatform {
    if (typeof navigator === 'undefined') return null;
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const combined = (ua + ' ' + platform).toLowerCase();
    
    if (combined.includes('win')) return 'windows';
    if (combined.includes('mac') || combined.includes('darwin')) return 'macos';
    if (combined.includes('linux') || combined.includes('x11')) return 'linux';
    return null;
  }
}
