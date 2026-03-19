import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import {
  ROADMAP_FEATURES,
  CATEGORIES,
  type RoadmapFeature,
  type FeatureStatus,
  type FeatureCategory,
  type CategoryMeta,
} from '../../data/roadmap.data';
import { RoadmapNodeComponent } from './roadmap-node/roadmap-node';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [RoadmapNodeComponent],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
          stagger(60, [
            animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' })),
      ]),
    ]),
  ],
})
export class RoadmapComponent {
  activeTab: FeatureStatus = 'implemented';
  activeCategory: FeatureCategory | 'all' = 'all';
  expandedFeature: string | null = null;

  allFeatures = ROADMAP_FEATURES;
  categories = CATEGORIES;

  get filteredFeatures(): RoadmapFeature[] {
    return this.allFeatures.filter((f) => {
      const matchStatus = f.status === this.activeTab;
      const matchCategory = this.activeCategory === 'all' || f.category === this.activeCategory;
      return matchStatus && matchCategory;
    });
  }

  get visibleCategories(): CategoryMeta[] {
    const cats = new Set(
      this.allFeatures
        .filter((f) => f.status === this.activeTab)
        .map((f) => f.category)
    );
    return this.categories.filter((c) => cats.has(c.id));
  }

  get implementedCount(): number {
    return this.allFeatures.filter((f) => f.status === 'implemented').length;
  }

  get plannedCount(): number {
    return this.allFeatures.filter((f) => f.status === 'planned').length;
  }

  setTab(tab: FeatureStatus) {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    this.activeCategory = 'all';
    this.expandedFeature = null;
  }

  setCategory(cat: FeatureCategory | 'all') {
    this.activeCategory = cat;
    this.expandedFeature = null;
  }

  toggleFeature(id: string) {
    this.expandedFeature = this.expandedFeature === id ? null : id;
  }

  getCategoryMeta(catId: FeatureCategory): CategoryMeta {
    return this.categories.find((c) => c.id === catId)!;
  }

  trackById(_index: number, feature: RoadmapFeature): string {
    return feature.id;
  }
}
