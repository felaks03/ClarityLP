import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year', () => {
    const year = new Date().getFullYear();
    expect(el.querySelector('.footer-bottom')?.textContent).toContain(String(year));
  });

  it('should render footer logo', () => {
    expect(el.querySelector('.footer-logo')?.textContent).toContain('Clarity');
  });

  it('should render navigation links', () => {
    const links = el.querySelectorAll('.footer-col a');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
