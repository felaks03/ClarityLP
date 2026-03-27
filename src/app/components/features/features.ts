import { Component, inject } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { trigger, style, transition, animate } from '@angular/animations';

interface Feature {
  id: string;
  icon: string;
  color: string;
  glow: string;
  detailIcons: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './features.html',
  styleUrl: './features.scss',
  animations: [
    trigger('detailFade', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate(
          '400ms 80ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class FeaturesComponent {
  private transloco = inject(TranslocoService);

  features: Feature[] = [
    {
      id: 'ftm',
      icon: 'bi-fullscreen',
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.2)',
      detailIcons: ['bi-display', 'bi-cursor', 'bi-clock-history', 'bi-x-circle', 'bi-book', 'bi-check2-square'],
    },
    {
      id: 'risk',
      icon: 'bi-shield-exclamation',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.2)',
      detailIcons: ['bi-graph-down-arrow', 'bi-file-earmark-bar-graph', 'bi-lock-fill', 'bi-infinity', 'bi-toggles', 'bi-display'],
    },
    {
      id: 'layouts',
      icon: 'bi-layout-split',
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.2)',
      detailIcons: ['bi-grid-1x2', 'bi-arrows-expand', 'bi-collection', 'bi-save', 'bi-arrows', 'bi-hdd'],
    },
    {
      id: 'checklist',
      icon: 'bi-check2-square',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.2)',
      detailIcons: ['bi-table', 'bi-palette2', 'bi-journal-plus', 'bi-ban', 'bi-arrows', 'bi-floppy'],
    },
  ];

  activeIndex = 0;

  get active(): Feature {
    return this.features[this.activeIndex];
  }

  offset(i: number): number {
    const n = this.features.length;
    let d = i - this.activeIndex;
    if (d > n / 2) d -= n;
    if (d < -(n / 2)) d += n;
    return d;
  }

  absOffset(i: number): number {
    return Math.abs(this.offset(i));
  }

  cardTransform(i: number): string {
    const o = this.offset(i);
    const abs = Math.abs(o);
    const sign = o >= 0 ? 1 : -1;

    // [translateX%, rotateYdeg, scale] per offset level
    const positions: [number, number, number][] = [
      [0, 0, 1],
      [72, -42, 0.78],
      [115, -68, 0.55],
    ];

    if (abs > 2) {
      return `translateX(${sign * 150}%) rotateY(${sign * -90}deg) scale(0.3)`;
    }

    const [tx, ry, s] = positions[abs];
    return `translateX(${sign * tx}%) rotateY(${sign * ry}deg) scale(${s})`;
  }

  cardOpacity(i: number): number {
    const abs = this.absOffset(i);
    return [1, 0.45, 0][abs] ?? 0;
  }

  cardZIndex(i: number): number {
    return [10, 5, 2][this.absOffset(i)] ?? 0;
  }

  select(i: number): void {
    this.activeIndex = i;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.features.length;
  }

  prev(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.features.length) % this.features.length;
  }
}
