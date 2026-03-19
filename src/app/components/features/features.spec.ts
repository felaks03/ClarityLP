import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesComponent } from './features';

describe('FeaturesComponent', () => {
  let fixture: ComponentFixture<FeaturesComponent>;
  let component: FeaturesComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 6 feature cards', () => {
    const cards = el.querySelectorAll('.feature-card');
    expect(cards.length).toBe(6);
  });

  it('should display feature titles', () => {
    const titles = el.querySelectorAll('.feature-title');
    expect(titles[0]?.textContent).toBe('Full Trading Mode');
  });

  it('should display feature descriptions', () => {
    const descs = el.querySelectorAll('.feature-desc');
    expect(descs.length).toBe(6);
    descs.forEach((d) => {
      expect(d.textContent!.length).toBeGreaterThan(10);
    });
  });

  it('should render feature icons', () => {
    const icons = el.querySelectorAll('.feature-icon i');
    expect(icons.length).toBe(6);
  });

  it('should have section header', () => {
    expect(el.querySelector('.section-title')?.textContent).toContain('operar con disciplina');
  });
});
