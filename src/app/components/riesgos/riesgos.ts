import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-riesgos-section',
  standalone: true,
  imports: [TranslocoDirective],
  templateUrl: './riesgos.html',
  styleUrl: './riesgos.scss',
})
export class RiesgosComponent {}
