import { Component, HostListener } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { FeaturesComponent } from '../../components/features/features';
import { PricingComponent } from '../../components/pricing/pricing';
import { DownloadsComponent } from '../../components/downloads/downloads';
import { CtaComponent } from '../../components/cta/cta';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, PricingComponent, DownloadsComponent, CtaComponent],
  template: `
    <app-hero></app-hero>
    <app-features></app-features>
    <app-pricing></app-pricing>
    <app-downloads></app-downloads>
    <app-cta></app-cta>
  `,
})
export class LandingPage {
  @HostListener('window:scroll')
  onScroll() {
    this.revealOnScroll();
  }

  ngAfterViewInit() {
    setTimeout(() => this.revealOnScroll(), 100);
  }

  private revealOnScroll() {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    const windowHeight = window.innerHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }
}
