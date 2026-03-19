import { Component } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'bi-fullscreen',
      title: 'Full Trading Mode',
      description: 'Modo inmersivo que bloquea el escritorio, las apps y el cursor. Solo tú y los mercados.',
      color: '#3b82f6',
    },
    {
      icon: 'bi-shield-lock',
      title: 'Risk Management',
      description: 'Bloqueos automáticos por tiempo cuando alcanzas tus límites. Sin decisiones emocionales.',
      color: '#8b5cf6',
    },
    {
      icon: 'bi-layout-split',
      title: 'Workspace Layouts',
      description: 'Divide tu pantalla en paneles con árbol binario. Guarda plantillas y cambia al instante.',
      color: '#06b6d4',
    },
    {
      icon: 'bi-list-check',
      title: 'Whitelist Only',
      description: 'Solo sitios autorizados. Cero distracciones. Los usuarios solicitan acceso temporal.',
      color: '#22c55e',
    },
    {
      icon: 'bi-check2-square',
      title: 'Trading Checklist',
      description: 'Checklists configurables previas al trading. Verifica tu plan antes de operar.',
      color: '#f59e0b',
    },
    {
      icon: 'bi-gear-wide-connected',
      title: 'Admin Panel',
      description: 'Gestión completa: usuarios, logs, analíticas, solicitudes e impersonación.',
      color: '#ec4899',
    },
  ];
}
