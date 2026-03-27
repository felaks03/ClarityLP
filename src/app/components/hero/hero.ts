import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  constructor(private scrollService: ScrollService) {}

  goToRoadmap() {
    this.scrollService.navigateAndScroll('/roadmap');
  }

  goToFeatures() {
    this.scrollService.navigateAndScroll('/', 'features');
  }
}
