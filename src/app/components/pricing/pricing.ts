import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class PricingComponent {}
