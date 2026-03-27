import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { FeatureSyncService } from '../../services/feature-sync.service';

interface FeatureInfo {
  id: string;
  icon: string;
  color: string;
  glow: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  activeMockup = 0;
  readonly mockupCount = 4;
  // Ordered to match the 4 mockup slides; used for sync and i18n labels
  readonly mockupFeatureIds = ['ftm', 'layouts', 'checklist', 'risk'];

  readonly featureInfoMap: Record<string, FeatureInfo> = {
    ftm: { id: 'ftm', icon: 'bi-fullscreen', color: '#3b82f6', glow: 'rgba(59,130,246,0.25)' },
    layouts: { id: 'layouts', icon: 'bi-layout-split', color: '#06b6d4', glow: 'rgba(6,182,212,0.25)' },
    checklist: { id: 'checklist', icon: 'bi-check2-square', color: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
    risk: { id: 'risk', icon: 'bi-shield-exclamation', color: '#8b5cf6', glow: 'rgba(139,92,246,0.25)' },
  };

  private syncSub!: Subscription;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private scrollService: ScrollService,
    private featureSync: FeatureSyncService,
  ) {}

  ngOnInit(): void {
    this.syncSub = this.featureSync.activeId$.subscribe(id => {
      const i = this.mockupFeatureIds.indexOf(id);
      if (i !== -1 && i !== this.activeMockup) this.activeMockup = i;
    });
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      const next = (this.activeMockup + 1) % this.mockupCount;
      this.featureSync.set(this.mockupFeatureIds[next]);
    }, 10000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  selectMockup(i: number): void {
    this.featureSync.set(this.mockupFeatureIds[i]);
    this.startAutoPlay();
  }

  mockupOffset(i: number): number {
    const n = this.mockupCount;
    let d = i - this.activeMockup;
    if (d > n / 2) d -= n;
    if (d < -(n / 2)) d += n;
    return d;
  }

  mockupAbsOffset(i: number): number {
    return Math.abs(this.mockupOffset(i));
  }

  mockupTransform(i: number): string {
    const o = this.mockupOffset(i);
    const abs = Math.abs(o);
    const sign = o >= 0 ? 1 : -1;
    const positions: [number, number, number][] = [
      [0, 0, 1],
      [68, -40, 0.8],
      [112, -65, 0.58],
    ];
    if (abs > 2) return `translateX(${sign * 145}%) rotateY(${sign * -90}deg) scale(0.3)`;
    const [tx, ry, s] = positions[abs];
    return `translateX(${sign * tx}%) rotateY(${sign * ry}deg) scale(${s})`;
  }

  mockupOpacity(i: number): number {
    return ([1, 0.45, 0][this.mockupAbsOffset(i)] ?? 0);
  }

  mockupZIndex(i: number): number {
    return ([10, 5, 2][this.mockupAbsOffset(i)] ?? 0);
  }

  prevMockup() {
    const next = (this.activeMockup - 1 + this.mockupCount) % this.mockupCount;
    this.featureSync.set(this.mockupFeatureIds[next]);
    this.startAutoPlay();
  }

  nextMockup() {
    const next = (this.activeMockup + 1) % this.mockupCount;
    this.featureSync.set(this.mockupFeatureIds[next]);
    this.startAutoPlay();
  }

  goToRoadmap() {
    this.scrollService.navigateAndScroll('/roadmap');
  }

  goToFeatures() {
    this.scrollService.scrollToFragment('showcase');
  }
}
