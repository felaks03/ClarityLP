import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  scrolled = false;
  mobileMenuOpen = false;
  theme: Theme = 'dark';

  constructor(private scrollService: ScrollService) {
    const stored = localStorage.getItem('clarity-theme');
    this.theme = stored === 'light' ? 'light' : 'dark';
    this.applyTheme(this.theme);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    localStorage.setItem('clarity-theme', this.theme);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  goToFeatures() {
    this.closeMobileMenu();
    this.scrollService.navigateAndScroll('/', 'features');
  }

  goToPricing() {
    this.closeMobileMenu();
    this.scrollService.navigateAndScroll('/', 'pricing');
  }
}
