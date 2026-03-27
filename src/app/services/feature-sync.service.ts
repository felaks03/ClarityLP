import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Keeps the active feature in sync between the hero mockup carousel
 * and the features carousel, using the feature id as the source of truth.
 */
@Injectable({ providedIn: 'root' })
export class FeatureSyncService {
  private readonly _activeId = new BehaviorSubject<string>('ftm');
  readonly activeId$ = this._activeId.asObservable();

  set(id: string): void {
    if (this._activeId.value !== id) {
      this._activeId.next(id);
    }
  }
}
