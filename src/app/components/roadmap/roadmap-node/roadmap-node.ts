import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import type { RoadmapFeature, CategoryMeta } from '../../../data/roadmap.data';

@Component({
  selector: 'app-roadmap-node',
  standalone: true,
  templateUrl: './roadmap-node.html',
  styleUrl: './roadmap-node.scss',
  animations: [
    trigger('expandDetail', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class RoadmapNodeComponent {
  @Input({ required: true }) feature!: RoadmapFeature;
  @Input({ required: true }) categoryMeta!: CategoryMeta;
  @Input() expanded = false;
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
