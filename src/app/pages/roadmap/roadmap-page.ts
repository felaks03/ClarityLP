import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

export interface MapNode {
  id: string;
  label: string;
  icon: string;
  description?: string;
  children?: MapNode[];
}

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './roadmap-page.html',
  styleUrl: './roadmap-page.scss',
})
export class RoadmapPage {
  tree: MapNode = {
    id: 'root',
    label: 'Roadmap',
    icon: 'bi-map',
    children: [
      {
        id: 'implemented',
        label: 'Implementado',
        icon: 'bi-check-circle-fill',
        children: [
          {
            id: 'imp-1',
            label: 'Full Trading Mode',
            icon: 'bi-fullscreen',
            description: 'Modo fullscreen inmersivo con bloqueo de cursor.',
          },
          {
            id: 'imp-2',
            label: 'Risk Management',
            icon: 'bi-shield-exclamation',
            description: 'Bloqueos temporales configurables.',
          },
          {
            id: 'imp-3',
            label: 'Workspace Layouts',
            icon: 'bi-layout-split',
            description: 'Paneles split con plantillas guardables.',
          },
          {
            id: 'imp-4',
            label: 'Admin Panel',
            icon: 'bi-gear-wide-connected',
            description: 'Gestión de usuarios, analíticas y logs.',
          },
          {
            id: 'imp-5',
            label: 'Checklist System',
            icon: 'bi-check2-square',
            description: 'Checklists personalizadas pre-trading.',
          },
        ],
      },
      {
        id: 'planned',
        label: 'Por implementar',
        icon: 'bi-clock-fill',
        children: [
          {
            id: 'plan-1',
            label: 'Multi-Monitor',
            icon: 'bi-display',
            description: 'Soporte nativo para múltiples pantallas.',
          },
          {
            id: 'plan-2',
            label: 'AI Trade Insights',
            icon: 'bi-cpu',
            description: 'Análisis inteligente de patrones.',
          },
          {
            id: 'plan-3',
            label: 'Plugin System',
            icon: 'bi-puzzle',
            description: 'Extensiones personalizadas.',
          },
          {
            id: 'plan-4',
            label: 'Trade Journal',
            icon: 'bi-journal-text',
            description: 'Diario de trading con capturas automáticas.',
          },
          {
            id: 'plan-5',
            label: 'Mobile Companion',
            icon: 'bi-phone',
            description: 'App móvil para alertas y monitorización.',
          },
        ],
      },
    ],
  };

  @HostListener('window:scroll')
  onScroll() {
    this.revealOnScroll();
  }

  ngAfterViewInit() {
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
