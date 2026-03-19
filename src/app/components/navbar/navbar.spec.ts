import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo text', () => {
    expect(el.querySelector('.logo-text')?.textContent).toBe('Clarity');
  });

  it('should render navigation links', () => {
    const links = el.querySelectorAll('.nav-link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('should toggle mobile menu', () => {
    expect(component.mobileMenuOpen).toBe(false);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(true);
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should close mobile menu', () => {
    component.mobileMenuOpen = true;
    component.closeMobileMenu();
    expect(component.mobileMenuOpen).toBe(false);
  });

  it('should add scrolled class when scrolled > 20px', () => {
    component.scrolled = false;
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    component.onScroll();
    expect(component.scrolled).toBe(true);
  });

  it('should not have scrolled class at top', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    component.onScroll();
    expect(component.scrolled).toBe(false);
  });
});
