import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

interface Feature {
  icon: string;
  label: string;
  description: string;
  detail: string;
  techs?: string[];
  version?: string;
}

interface Category {
  icon: string;
  label: string;
  tag: string;
  description: string;
  features: Feature[];
}

interface RoadmapSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  status: 'implemented' | 'planned';
  categories: Category[];
}

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './roadmap-page.html',
  styleUrl: './roadmap-page.scss',
})
export class RoadmapPage implements AfterViewInit, OnDestroy {
  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  expandedFeature: string | null = null;
  activeFilter: 'all' | 'implemented' | 'planned' = 'all';
  private observer!: IntersectionObserver;

  sections: RoadmapSection[] = [
    {
      id: 'implemented',
      title: 'Implementado',
      subtitle: 'Funcionalidades disponibles en producción, probadas y estables.',
      icon: 'bi-check-circle-fill',
      status: 'implemented',
      categories: [
        {
          icon: 'bi-graph-up-arrow',
          label: 'Trading',
          tag: 'Core',
          description: 'El motor principal de Clarity — herramientas diseñadas para operar con disciplina y sin distracciones.',
          features: [
            {
              icon: 'bi-fullscreen',
              label: 'Full Trading Mode',
              description: 'Modo fullscreen inmersivo con bloqueo de cursor y activación por horario.',
              detail: 'Elimina distracciones bloqueando el escritorio, aplicaciones y el cursor fuera de las ventanas de trading. Se activa automáticamente según el horario configurado o de forma manual.',
              techs: ['Electron BrowserWindow', 'Node IPC', 'Windows API'],
              version: 'v1.0',
            },
            {
              icon: 'bi-shield-exclamation',
              label: 'Risk Management',
              description: 'Bloqueos temporales configurables (1d / 1w / 1m / permanente).',
              detail: 'Configura límites de riesgo con bloqueos automáticos por tiempo. Cuando alcanzas tus límites, el sistema bloquea completamente el acceso al trading hasta que expire el periodo.',
              techs: ['Express Middleware', 'MongoDB TTL', 'Cron Jobs'],
              version: 'v1.0',
            },
          ],
        },
        {
          icon: 'bi-palette',
          label: 'UI / UX',
          tag: 'Interface',
          description: 'Interfaz profesional y adaptable — cada pixel pensado para traders.',
          features: [
            {
              icon: 'bi-layout-split',
              label: 'Workspace Layouts',
              description: 'Paneles split con árbol binario y plantillas guardables.',
              detail: 'Crea layouts personalizados dividiendo la pantalla en paneles arrastrables. Guarda configuraciones como plantillas nombradas y cambia entre ellas al instante con shortcuts.',
              techs: ['Angular CDK', 'Binary Tree', 'LocalStorage'],
              version: 'v1.0',
            },
            {
              icon: 'bi-moon-stars',
              label: 'Dark & Light Theme',
              description: 'Sistema de temas con cambio instantáneo y persistencia.',
              detail: 'Paleta Slate profesional con transición fluida entre modo oscuro y claro. Todas las interfaces, incluyendo el admin panel, respetan el tema seleccionado.',
              techs: ['CSS Custom Properties', 'LocalStorage'],
              version: 'v1.1',
            },
          ],
        },
        {
          icon: 'bi-shield-lock',
          label: 'Seguridad',
          tag: 'Security',
          description: 'Capa de seguridad empresarial — control total sobre accesos, sesiones y permisos.',
          features: [
            {
              icon: 'bi-list-check',
              label: 'Whitelist Navigation',
              description: 'Solo acceso a sitios autorizados por dominio.',
              detail: 'Navegación restringida exclusivamente a dominios aprobados por el administrador. Cualquier intento de acceder a un sitio no autorizado es bloqueado y registrado.',
              techs: ['Electron WebRequest', 'Express API', 'Domain Matching'],
              version: 'v1.0',
            },
            {
              icon: 'bi-gear-wide-connected',
              label: 'Admin Panel',
              description: 'Gestión completa de usuarios, analíticas, logs y solicitudes.',
              detail: 'Panel de administración con dashboard global, gestión de usuarios por roles (admin/trader), visor de logs en tiempo real, y flujo de aprobación de solicitudes.',
              techs: ['Angular', 'Express', 'MongoDB Aggregation'],
              version: 'v1.0',
            },
            {
              icon: 'bi-key',
              label: 'Autenticación JWT',
              description: 'Sesiones seguras con refresh automático y rotación de tokens.',
              detail: 'Sistema de autenticación con access token (15min) y refresh token (7d). Restauración automática de sesión al abrir la app y renovación silenciosa sin interrumpir al usuario.',
              techs: ['JWT', 'Express Middleware', 'HTTP-Only Cookies'],
              version: 'v1.0',
            },
            {
              icon: 'bi-person-badge',
              label: 'Impersonación',
              description: 'Admins pueden navegar como cualquier usuario sin conocer su contraseña.',
              detail: 'Sesión de impersonación con banner visual indicativo, restricciones de seguridad y botón de retorno instantáneo a la sesión de admin original.',
              techs: ['JWT Claims', 'Express Guards', 'Angular Interceptors'],
              version: 'v1.2',
            },
          ],
        },
        {
          icon: 'bi-lightning-charge',
          label: 'Productividad',
          tag: 'Productivity',
          description: 'Herramientas que optimizan tu rutina diaria de trading.',
          features: [
            {
              icon: 'bi-check2-square',
              label: 'Checklist System',
              description: 'Checklists personalizadas con columnas y tipos de celda configurables.',
              detail: 'Checklists pre-trading completamente customizables: columnas con texto libre, checkbox, número, selector desplegable. Persistencia automática y reseteo diario opcional.',
              techs: ['Angular Forms', 'MongoDB', 'Express CRUD'],
              version: 'v1.1',
            },
            {
              icon: 'bi-send-plus',
              label: 'Site Requests',
              description: 'Solicitudes de sitios web con acceso temporal de 24 horas.',
              detail: 'Los traders pueden solicitar acceso a sitios. Se concede acceso temporal inmediato de 24h mientras el administrador revisa y aprueba o rechaza la solicitud permanentemente.',
              techs: ['Express Queue', 'MongoDB TTL Index', 'WebSocket Notify'],
              version: 'v1.0',
            },
            {
              icon: 'bi-keyboard',
              label: 'Atajos de Teclado',
              description: 'Shortcuts globales para acciones rápidas.',
              detail: 'Ctrl+Shift+C para abrir la checklist, Ctrl+Shift+X para activar el risk shield. Funcionan incluso cuando la app no está en foco gracias a los global shortcuts de Electron.',
              techs: ['Electron globalShortcut', 'IPC Bridge'],
              version: 'v1.0',
            },
            {
              icon: 'bi-bar-chart-line',
              label: 'Analíticas de Uso',
              description: 'Dashboard con métricas detalladas de comportamiento.',
              detail: 'Visualiza patrones de uso: sitios más visitados, horas pico de actividad, duración de sesiones de trading, frecuencia de uso de checklist y más. Filtrable por usuario y rango de fechas.',
              techs: ['Chart.js', 'MongoDB Aggregation', 'Express Analytics'],
              version: 'v1.1',
            },
          ],
        },
      ],
    },
    {
      id: 'planned',
      title: 'Por implementar',
      subtitle: 'Funcionalidades en planificación activa — el futuro de Clarity.',
      icon: 'bi-clock-fill',
      status: 'planned',
      categories: [
        {
          icon: 'bi-rocket-takeoff',
          label: 'Plataforma',
          tag: 'Platform',
          description: 'Evolución de la plataforma — más pantallas, más herramientas, más posibilidades.',
          features: [
            {
              icon: 'bi-display',
              label: 'Multi-Monitor',
              description: 'Soporte nativo para múltiples pantallas con layouts independientes.',
              detail: 'Detección automática de monitores conectados. Cada pantalla con su propio workspace y layout. Drag & drop de paneles entre monitores y memoria de configuración por setup.',
              techs: ['Electron Screen API', 'BrowserWindow Multi', 'IPC Sync'],
            },
            {
              icon: 'bi-puzzle',
              label: 'Plugin System',
              description: 'Arquitectura de extensiones con marketplace integrado.',
              detail: 'Sistema de plugins para widgets personalizados, indicadores técnicos y herramientas de terceros. API abierta con SDK documentado, sandbox de seguridad y marketplace comunitario.',
              techs: ['Plugin API', 'Sandboxed iframes', 'NPM Registry'],
            },
            {
              icon: 'bi-phone',
              label: 'Mobile Companion',
              description: 'App móvil para alertas, monitorización y control remoto.',
              detail: 'App nativa iOS/Android con alertas push en tiempo real, monitorización del estado de la app de escritorio y control remoto del Full Trading Mode desde el móvil.',
              techs: ['React Native', 'Push Notifications', 'WebSocket'],
            },
          ],
        },
        {
          icon: 'bi-cpu',
          label: 'Inteligencia',
          tag: 'AI',
          description: 'Machine learning aplicado a tus patrones de trading para mejorar tu rendimiento.',
          features: [
            {
              icon: 'bi-stars',
              label: 'AI Trade Insights',
              description: 'Análisis inteligente de patrones de comportamiento y riesgo.',
              detail: 'Modelos de ML entrenados con tus datos de uso para detectar patrones de riesgo, horas de over-trading, y sugerir ajustes a tu rutina. Reportes semanales automáticos con insights accionables.',
              techs: ['Python ML Pipeline', 'TensorFlow.js', 'REST API'],
            },
            {
              icon: 'bi-speedometer2',
              label: 'Performance Dashboard',
              description: 'Dashboard de rendimiento con conexión directa a broker.',
              detail: 'P&L en tiempo real, drawdown chart, ratio riesgo/beneficio, equity curve. Conexión API con brokers principales (Interactive Brokers, MT5) para importar datos automáticamente.',
              techs: ['Broker APIs', 'WebSocket Streams', 'D3.js Charts'],
            },
          ],
        },
        {
          icon: 'bi-tools',
          label: 'Herramientas',
          tag: 'Tools',
          description: 'Más herramientas para completar tu toolkit de trading.',
          features: [
            {
              icon: 'bi-journal-text',
              label: 'Trade Journal',
              description: 'Diario de trading con capturas automáticas y análisis.',
              detail: 'Registro automático de cada trade con screenshots del chart, notas libres, tags de estrategia, emociones y métricas. Exportación a PDF y estadísticas históricas por estrategia.',
              techs: ['Electron desktopCapturer', 'PDF Generation', 'MongoDB'],
            },
            {
              icon: 'bi-command',
              label: 'Custom Hotkeys',
              description: 'Atajos de teclado totalmente personalizables con editor visual.',
              detail: 'Define atajos para cualquier acción de Clarity. Editor visual inspirado en VS Code keybindings con búsqueda, conflictos detectados y sugerencias. Exportar/importar configuraciones.',
              techs: ['Electron Accelerator', 'JSON Config', 'Angular Reactive Forms'],
            },
            {
              icon: 'bi-grid-1x2',
              label: 'Advanced Templates',
              description: 'Plantillas de workspace compartidas y marketplace.',
              detail: 'Crea, exporta e importa plantillas de workspace completas incluyendo layout, URLs, tema y configuraciones. Marketplace comunitario para compartir setups optimizados por tipo de trading.',
              techs: ['JSON Schema', 'Cloud Storage', 'Express Marketplace API'],
            },
          ],
        },
      ],
    },
  ];

  ngAfterViewInit() {
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    this.revealEls.forEach((el) => this.observer.observe(el.nativeElement));
    this.revealEls.changes.subscribe((els: QueryList<ElementRef>) => {
      els.forEach((el) => {
        if (!el.nativeElement.classList.contains('revealed')) {
          this.observer.observe(el.nativeElement);
        }
      });
    });
  }

  get filteredSections(): RoadmapSection[] {
    if (this.activeFilter === 'all') return this.sections;
    return this.sections.filter((s) => s.status === this.activeFilter);
  }

  setFilter(f: 'all' | 'implemented' | 'planned') {
    this.activeFilter = f;
    this.expandedFeature = null;
  }

  toggleFeature(id: string) {
    this.expandedFeature = this.expandedFeature === id ? null : id;
  }

  featureId(sectionId: string, catIdx: number, featIdx: number): string {
    return `${sectionId}-${catIdx}-${featIdx}`;
  }

  get implementedCount(): number {
    return this.sections
      .find((s) => s.id === 'implemented')!
      .categories.reduce((sum, c) => sum + c.features.length, 0);
  }

  get plannedCount(): number {
    return this.sections
      .find((s) => s.id === 'planned')!
      .categories.reduce((sum, c) => sum + c.features.length, 0);
  }

  get totalCount(): number {
    return this.implementedCount + this.plannedCount;
  }

  get progressPercent(): number {
    return Math.round((this.implementedCount / this.totalCount) * 100);
  }
}
