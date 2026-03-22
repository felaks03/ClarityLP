import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class DownloadsComponent implements OnInit {
  detectedPlatform: DetectedPlatform = null;
  showAll = false;
  copied = false;
  version = '0.1.0';
  lastUpdated = 'March 2026';

  downloads: DownloadOption[] = [
    {
      platform: 'windows',
      label: 'Download for Windows',
      fileName: 'Clarity Setup 0.1.0.exe',
      url: '/downloads/Clarity%20Setup%200.1.0.exe',
      size: '98 MB',
      icon: 'bi-windows',
      note: 'Installer will prompt for admin permissions',
      primary: true,
    },
    {
      platform: 'macos',
      label: 'Download for macOS',
      fileName: 'Clarity-0.1.0.dmg',
      url: '/downloads/Clarity-0.1.0.dmg',
      size: '115 MB',
      icon: 'bi-apple',
      note: 'Unsigned build — right-click > Open on first launch. The .dmg includes a drag-to-Applications shortcut',
      primary: true,
    },
    {
      platform: 'macos',
      label: 'Download .zip (macOS)',
      fileName: 'Clarity-0.1.0-mac.zip',
      url: '/downloads/Clarity-0.1.0-mac.zip',
      size: '115 MB',
      icon: 'bi-apple',
      note: 'Fallback if .dmg is unavailable — unzip and drag Clarity.app to Applications',
      primary: false,
    },
    {
      platform: 'linux',
      label: 'Install on Linux',
      fileName: 'install.sh',
      url: '/install.sh',
      size: 'Auto-detect',
      icon: 'bi-terminal',
      note: 'Detects tu distro e instala el paquete correcto automáticamente',
      primary: true,
    },
    {
      platform: 'linux',
      label: 'Download .deb (Debian/Ubuntu)',
      fileName: 'clarity_0.1.0_amd64.deb',
      url: '/downloads/clarity_0.1.0_amd64.deb',
      size: '93 MB',
      icon: 'bi-ubuntu',
      note: 'Para Debian, Ubuntu, Linux Mint, Pop!_OS',
      primary: false,
    },
    {
      platform: 'linux',
      label: 'Download .rpm (Fedora/RHEL)',
      fileName: 'clarity-0.1.0.x86_64.rpm',
      url: '/downloads/clarity-0.1.0.x86_64.rpm',
      size: '93 MB',
      icon: 'bi-filetype-raw',
      note: 'Para Fedora, RHEL, CentOS, openSUSE',
      primary: false,
    },
    {
      platform: 'linux',
      label: 'Download .pacman (Arch)',
      fileName: 'clarity-0.1.0.pacman',
      url: '/downloads/clarity-0.1.0.pacman',
      size: '93 MB',
      icon: 'bi-box',
      note: 'Para Arch Linux, Manjaro, EndeavourOS',
      primary: false,
    },
    {
      platform: 'linux',
      label: 'Download AppImage',
      fileName: 'Clarity-0.1.0.AppImage',
      url: '/downloads/Clarity-0.1.0.AppImage',
      size: '119 MB',
      icon: 'bi-box-arrow-down',
      note: 'Portable — funciona en cualquier distro sin instalar',
      primary: false,
    },
  ];

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
    // Show only detected primary download, or all primary if no detection
    if (this.detectedPlatform) {
      return this.sortedDownloads.filter((d) => d.platform === this.detectedPlatform && d.primary);
    }
    return this.sortedDownloads.filter((d) => d.primary);
  }

  ngOnInit() {
    this.detectedPlatform = this.detectPlatform();
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

  private detectPlatform(): DetectedPlatform {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) return 'windows';
    if (ua.includes('mac')) return 'macos';
    if (ua.includes('linux')) return 'linux';
    return null;
  }
}
