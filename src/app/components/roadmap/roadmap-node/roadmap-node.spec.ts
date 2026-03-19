import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoadmapNodeComponent } from './roadmap-node';
import type { RoadmapFeature, CategoryMeta } from '../../../data/roadmap.data';

describe('RoadmapNodeComponent', () => {
  let fixture: ComponentFixture<RoadmapNodeComponent>;
  let component: RoadmapNodeComponent;
  let el: HTMLElement;

  const mockFeature: RoadmapFeature = {
    id: 'test-feature',
    title: 'Test Feature',
    description: 'Short description of the test feature.',
    detail: 'Extended detail explaining why this feature is useful and how it works in the product.',
    category: 'trading',
    status: 'implemented',
    icon: 'bi-graph-up-arrow',
  };

  const mockCategory: CategoryMeta = {
    id: 'trading',
    label: 'Trading',
    icon: 'bi-graph-up-arrow',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.35)',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapNodeComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoadmapNodeComponent);
    component = fixture.componentInstance;
    component.feature = mockFeature;
    component.categoryMeta = mockCategory;
    component.expanded = false;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display feature title', () => {
    expect(el.querySelector('.node-title')?.textContent).toBe('Test Feature');
  });

  it('should display feature description', () => {
    expect(el.querySelector('.node-desc')?.textContent).toBe('Short description of the test feature.');
  });

  it('should display category label', () => {
    expect(el.querySelector('.node-category')?.textContent).toContain('Trading');
  });

  it('should show "Live" badge for implemented features', () => {
    const badge = el.querySelector('.node-status-badge');
    expect(badge?.textContent?.trim()).toBe('Live');
    expect(badge?.classList.contains('implemented')).toBe(true);
  });

  it('should show "Planned" badge for planned features', () => {
    component.feature = { ...mockFeature, status: 'planned' };
    fixture.detectChanges();
    const badge = el.querySelector('.node-status-badge');
    expect(badge?.textContent?.trim()).toBe('Planned');
    expect(badge?.classList.contains('planned')).toBe(true);
  });

  it('should not show detail when not expanded', () => {
    expect(el.querySelector('.node-detail')).toBeFalsy();
  });

  it('should show detail when expanded', () => {
    component.expanded = true;
    fixture.detectChanges();
    const detail = el.querySelector('.detail-text');
    expect(detail).toBeTruthy();
    expect(detail?.textContent).toContain('Extended detail');
  });

  it('should emit toggle event on click', () => {
    const spy = vi.spyOn(component.toggle, 'emit');
    const node = el.querySelector('.node') as HTMLElement;
    node.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit toggle on Enter key', () => {
    const spy = vi.spyOn(component.toggle, 'emit');
    const node = el.querySelector('.node') as HTMLElement;
    node.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should have correct aria-expanded attribute', () => {
    const node = el.querySelector('.node');
    expect(node?.getAttribute('aria-expanded')).toBe('false');

    component.expanded = true;
    fixture.detectChanges();
    expect(node?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have role="button"', () => {
    const node = el.querySelector('.node');
    expect(node?.getAttribute('role')).toBe('button');
  });

  it('should apply implemented class', () => {
    const node = el.querySelector('.node');
    expect(node?.classList.contains('implemented')).toBe(true);
  });

  it('should apply expanded class', () => {
    component.expanded = true;
    fixture.detectChanges();
    const node = el.querySelector('.node');
    expect(node?.classList.contains('expanded')).toBe(true);
  });

  it('should show down chevron when collapsed', () => {
    const icon = el.querySelector('.node-expand-icon i');
    expect(icon?.classList.contains('bi-chevron-down')).toBe(true);
  });

  it('should show up chevron when expanded', () => {
    component.expanded = true;
    fixture.detectChanges();
    const icon = el.querySelector('.node-expand-icon i');
    expect(icon?.classList.contains('bi-chevron-up')).toBe(true);
  });
});
