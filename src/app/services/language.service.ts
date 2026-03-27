import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private transloco = inject(TranslocoService);

  private readonly STORAGE_KEY = 'clarity-language';

  init() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    const browserLang = navigator.language?.split('-')[0];
    const lang = stored || (['es', 'en'].includes(browserLang) ? browserLang : 'en');
    this.setLang(lang);
  }

  get activeLang(): string {
    return this.transloco.getActiveLang();
  }

  setLang(lang: string) {
    this.transloco.setActiveLang(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  toggle() {
    this.setLang(this.activeLang === 'en' ? 'es' : 'en');
  }
}
