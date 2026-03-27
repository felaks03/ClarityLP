import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { FeatureSyncService } from '../../services/feature-sync.service';

interface Feature {
  id: string;
  icon: string;
  color: string;
  glow: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private featureSync = inject(FeatureSyncService);
  private syncSub!: Subscription;

  features: Feature[] = [
    { id: 'ftm', icon: 'bi-fullscreen', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.2)' },
    { id: 'risk', icon: 'bi-shield-exclamation', color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
    { id: 'layouts', icon: 'bi-layout-split', color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.2)' },
    { id: 'checklist', icon: 'bi-check2-square', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)' },
  ];

  activeIndex = 0;

  ngOnInit(): void {
    this.syncSub = this.featureSync.activeId$.subscribe(id => {
      const i = this.features.findIndex(f => f.id === id);
      if (i !== -1) this.activeIndex = i;
    });
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
  }

  select(i: number): void {
    this.featureSync.set(this.features[i].id);
    // Scroll to hero to show the mockup preview
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
