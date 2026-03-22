import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private router: Router) {}

  /**
   * Navigate to a path and scroll to a fragment.
   * If already on that path, just scroll to the fragment.
   */
  navigateAndScroll(path: string, fragment?: string) {
    this.router.navigate([path], { fragment }).then(() => {
      if (fragment) {
        this.scrollToFragment(fragment);
      } else {
        // Si no hay fragment, scrollea al top de la página
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
      }
    });
  }

  /**
   * Scroll to a fragment on current page with retry logic
   */
  scrollToFragment(fragment: string, maxRetries = 10, retryCount = 0) {
    const element = document.getElementById(fragment);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    } else if (retryCount < maxRetries) {
      setTimeout(() => {
        this.scrollToFragment(fragment, maxRetries, retryCount + 1);
      }, 100);
    }
  }
}
