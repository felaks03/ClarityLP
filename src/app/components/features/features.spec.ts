import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './features';

describe('FeaturesComponent', () => {
  let fixture: ComponentFixture<FeaturesComponent>;
  let component: FeaturesComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 8 feature cards', () => {
    const cards = el.querySelectorAll('.feature-card');
    expect(cards.length).toBe(8);
  });

  it('should display feature titles', () => {
    const titles = el.querySelectorAll('.feature-title');
    expect(titles[0]?.textContent).toBe('Full Trading Mode');
  });

  it('should display feature descriptions', () => {
    const descs = el.querySelectorAll('.feature-desc');
    expect(descs.length).toBe(8);
    descs.forEach((d) => {
      expect(d.textContent!.length).toBeGreaterThan(50);
    });
  });

  it('should render feature icons', () => {
    const icons = el.querySelectorAll('.feature-icon i');
    expect(icons.length).toBe(8);
  });

  it('should have section header', () => {
    expect(el.querySelector('.section-title')?.textContent).toContain('listo para usar');
  });

  it('should toggle feature expansion on click', () => {
    const firstFeature = component.features[0];
    expect(firstFeature.expanded).toBe(false);
    component.toggleFeature(firstFeature);
    expect(firstFeature.expanded).toBe(true);
    component.toggleFeature(firstFeature);
    expect(firstFeature.expanded).toBe(false);
  });

  it('should not include any admin features', () => {
    const allText = component.features
      .map((f) => `${f.title} ${f.description}`)
      .join(' ')
      .toLowerCase();
    expect(allText).not.toContain('admin');
    expect(allText).not.toContain('impersonación');
    expect(allText).not.toContain('impersonation');
  });

  it('should have details with titles for each feature', () => {
    component.features.forEach((f) => {
      expect(f.details.length).toBeGreaterThan(0);
      f.details.forEach((d) => {
        expect(d.title.length).toBeGreaterThan(0);
        expect(d.text.length).toBeGreaterThan(30);
      });
    });
  });

  it('should have subtitles for each feature', () => {
    component.features.forEach((f) => {
      expect(f.subtitle.length).toBeGreaterThan(0);
    });
  });

  it('should have icon labels explaining each icon', () => {
    component.features.forEach((f) => {
      expect(f.iconLabel.length).toBeGreaterThan(0);
      expect(f.iconLabel.toLowerCase()).toContain('icono');
    });
  });
});
