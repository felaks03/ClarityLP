import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { FeaturesComponent } from './components/features/features';
import { RoadmapComponent } from './components/roadmap/roadmap';
import { CtaComponent } from './components/cta/cta';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    RoadmapComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @HostListener('window:scroll')
  onScroll() {
    this.revealOnScroll();
  }

  ngAfterViewInit() {
    // Initial reveal check
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
