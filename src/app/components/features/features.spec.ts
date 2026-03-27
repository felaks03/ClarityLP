import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { FeaturesComponent } from './features';

describe('FeaturesComponent', () => {
  let fixture: ComponentFixture<FeaturesComponent>;
  let component: FeaturesComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideTransloco({
          config: {
            availableLangs: ['en', 'es'],
            defaultLang: 'en',
            fallbackLang: 'en',
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 features', () => {
    expect(component.features.length).toBe(4);
  });

  it('should have unique feature ids', () => {
    const ids = component.features.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have detail icons for each feature', () => {
    component.features.forEach((f) => {
      expect(f.detailIcons.length).toBeGreaterThan(0);
    });
  });

  it('should default to activeIndex 0', () => {
    expect(component.activeIndex).toBe(0);
  });

  it('should navigate features with next/prev', () => {
    component.next();
    expect(component.activeIndex).toBe(1);
    component.prev();
    expect(component.activeIndex).toBe(0);
  });

  it('should wrap around with next', () => {
    component.activeIndex = 3;
    component.next();
    expect(component.activeIndex).toBe(0);
  });

  it('should wrap around with prev', () => {
    component.activeIndex = 0;
    component.prev();
    expect(component.activeIndex).toBe(3);
  });

  it('should select a feature by index', () => {
    component.select(2);
    expect(component.activeIndex).toBe(2);
  });
});
