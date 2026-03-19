import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoadmapComponent } from './roadmap';
import { ROADMAP_FEATURES } from '../../data/roadmap.data';

describe('RoadmapComponent', () => {
  let fixture: ComponentFixture<RoadmapComponent>;
  let component: RoadmapComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Tab switching ---
  it('should default to "implemented" tab', () => {
    expect(component.activeTab).toBe('implemented');
  });

  it('should switch to "planned" tab', () => {
    component.setTab('planned');
    expect(component.activeTab).toBe('planned');
    expect(component.activeCategory).toBe('all');
    expect(component.expandedFeature).toBeNull();
  });

  it('should not reset state when clicking already active tab', () => {
    component.activeCategory = 'trading' as any;
    component.setTab('implemented');
    expect(component.activeCategory).toBe('trading');
  });

  it('should render both tab buttons', () => {
    const tabs = el.querySelectorAll('.tab');
    expect(tabs.length).toBe(2);
    expect(tabs[0]?.textContent).toContain('Implementado');
    expect(tabs[1]?.textContent).toContain('Por implementar');
  });

  // --- Filtering ---
  it('should show only implemented features by default', () => {
    const implemented = ROADMAP_FEATURES.filter((f) => f.status === 'implemented');
    expect(component.filteredFeatures.length).toBe(implemented.length);
  });

  it('should show only planned features in planned tab', () => {
    component.setTab('planned');
    const planned = ROADMAP_FEATURES.filter((f) => f.status === 'planned');
    expect(component.filteredFeatures.length).toBe(planned.length);
  });

  it('should filter by category', () => {
    component.setCategory('trading');
    const expected = ROADMAP_FEATURES.filter(
      (f) => f.status === 'implemented' && f.category === 'trading'
    );
    expect(component.filteredFeatures.length).toBe(expected.length);
  });

  it('should show all when category is "all"', () => {
    component.setCategory('trading');
    component.setCategory('all');
    const implemented = ROADMAP_FEATURES.filter((f) => f.status === 'implemented');
    expect(component.filteredFeatures.length).toBe(implemented.length);
  });

  // --- Expand/collapse ---
  it('should toggle feature expansion', () => {
    expect(component.expandedFeature).toBeNull();
    component.toggleFeature('full-trading-mode');
    expect(component.expandedFeature).toBe('full-trading-mode');
    component.toggleFeature('full-trading-mode');
    expect(component.expandedFeature).toBeNull();
  });

  it('should collapse previous feature when expanding another', () => {
    component.toggleFeature('full-trading-mode');
    component.toggleFeature('risk-management');
    expect(component.expandedFeature).toBe('risk-management');
  });

  it('should reset expansion when switching tab', () => {
    component.toggleFeature('full-trading-mode');
    component.setTab('planned');
    expect(component.expandedFeature).toBeNull();
  });

  // --- Counts ---
  it('should count implemented features correctly', () => {
    const expected = ROADMAP_FEATURES.filter((f) => f.status === 'implemented').length;
    expect(component.implementedCount).toBe(expected);
  });

  it('should count planned features correctly', () => {
    const expected = ROADMAP_FEATURES.filter((f) => f.status === 'planned').length;
    expect(component.plannedCount).toBe(expected);
  });

  // --- Category filters ---
  it('should render category filter buttons', () => {
    const filters = el.querySelectorAll('.cat-filter');
    expect(filters.length).toBeGreaterThanOrEqual(3); // "Todas" + at least 2 categories
  });

  it('should show only visible categories for current tab', () => {
    const cats = component.visibleCategories;
    cats.forEach((cat) => {
      const hasFeature = ROADMAP_FEATURES.some(
        (f) => f.status === component.activeTab && f.category === cat.id
      );
      expect(hasFeature).toBe(true);
    });
  });

  // --- Roadmap nodes rendering ---
  it('should render roadmap node components', () => {
    fixture.detectChanges();
    const nodes = el.querySelectorAll('app-roadmap-node');
    expect(nodes.length).toBe(component.filteredFeatures.length);
  });

  // --- Tab indicator ---
  it('should move tab indicator to right for planned', () => {
    component.setTab('planned');
    fixture.detectChanges();
    const indicator = el.querySelector('.tab-indicator');
    expect(indicator?.classList.contains('right')).toBe(true);
  });

  it('should have tab indicator on left for implemented', () => {
    fixture.detectChanges();
    const indicator = el.querySelector('.tab-indicator');
    expect(indicator?.classList.contains('right')).toBe(false);
  });
});
