import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the main headline', () => {
    const title = el.querySelector('.hero-title');
    expect(title?.textContent).toContain('sin distracciones');
  });

  it('should render CTA buttons', () => {
    const buttons = el.querySelectorAll('.hero-actions a');
    expect(buttons.length).toBe(2);
  });

  it('should render stats section', () => {
    const stats = el.querySelectorAll('.stat');
    expect(stats.length).toBe(3);
  });

  it('should render the mockup visual', () => {
    expect(el.querySelector('.mockup')).toBeTruthy();
    expect(el.querySelector('.mockup-titlebar')).toBeTruthy();
  });

  it('should display the badge text', () => {
    const badge = el.querySelector('.badge');
    expect(badge?.textContent).toContain('Built for Focused Traders');
  });
});
