import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class CtaComponent {
  constructor(private scrollService: ScrollService) {}

  goToRoadmap() {
    this.scrollService.navigateAndScroll('/roadmap');
  }

  goToDownloads() {
    this.scrollService.navigateAndScroll('/', 'downloads');
  }
}
