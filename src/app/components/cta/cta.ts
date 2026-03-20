import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class CtaComponent {
  constructor(private scrollService: ScrollService) {}

  goToRoadmap() {
    this.scrollService.navigateAndScroll('/roadmap');
  }
}
