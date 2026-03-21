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
  detail?: string;
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
              description: '¿Falta de disciplina? ¿Te cuesta seguir tus normas? El Full trading mode esta pensado para no poder incumplir tus normas ni romper tu disciplina por mucho que quieras. Durante tu session de trading tendras: riesgo bloqueado, distracciones bloqueadas, navegadores externos bloqueados y mucho más.',
            },
            {
              icon: 'bi-shield-exclamation',
              label: 'Risk Management',
              description: 'Define límites de pérdida y ganancia por operación, día, semana y mes. Máximo de contratos, operaciones por sesión y mucho más. Bloquea la configuración el tiempo que quieras, una vez bloqueado, no puedes cambiar nada hasta que expire.',
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
              description: 'Ten todas tus aplicaciones de trading en el mismo workspace, divide la pantalla en paneles con splits horizontales y verticales, cada uno con una web diferente. Guarda tus layouts favoritos.',
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
              description: 'Personaliza tu estrategia al máximo. Listas con columnas de texto, número, selects, multi-select, fecha, hora y checkbox. Puedes tener varias checklists y hacer que completar una sea obligatorio antes de operar.',
            },
            {
              icon: 'bi-send-plus',
              label: 'Site Requests',
              description: 'Solicitudes de sitios con acceso temporal automático de 24h mientras se revisan.',
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
          label: 'Plataforma &amp; Herramientas',
          tag: 'Platform',
          description: 'Evolución de la plataforma y nuevas herramientas para traders.',
          features: [
            {
              icon: 'bi-bar-chart-line',
              label: 'Estadísticas de Desempeño',
              description: 'Dashboard completo con métricas de comportamiento, tiempo de uso y patrones.',
              detail: 'Panel de analíticas que muestra tus patrones de uso detallados: tiempo total en sesión, sitios más visitados, horas de mayor actividad, frecuencia de uso del checklist y métricas de productividad. Gráficas de evolución semanal y mensual para identificar tendencias en tu disciplina. Los administradores pueden ver estadísticas agregadas por usuario.',
            },
            {
              icon: 'bi-chat-dots',
              label: 'Sistema de Chat',
              description: 'Chat integrado en tiempo real para comunicación directa entre traders.',
              detail: 'Sistema de mensajería en tiempo real integrado en Clarity. Permite conversaciones directas entre traders, canales por temática (futuros, forex, análisis técnico) y mensajes grupales. Comparte ideas, alertas y setups sin salir de tu entorno de trading. Historial de mensajes persistente y notificaciones configurables.',
            },
            {
              icon: 'bi-journal-richtext',
              label: 'Journal Automático con IA',
              description: 'Diario de trading generado automáticamente por inteligencia artificial.',
              detail: 'La IA registra automáticamente cada operación con capturas del chart, hora de entrada y salida, instrumento, resultado y contexto de mercado. Genera un resumen diario con observaciones sobre tu comportamiento: si seguiste el plan, si operaste fuera de horario, si respetaste el riesgo. Reduce a cero el esfuerzo de journaling manteniendo un registro completo y objetivo de toda tu operativa.',
            },
            {
              icon: 'bi-diagram-3',
              label: 'Creador de Estrategias',
              description: 'Herramienta visual para diseñar, documentar y seguir tus estrategias de trading.',
              detail: 'Editor visual donde defines tu estrategia paso a paso: condiciones de entrada, gestión de posición, stop loss, take profit y reglas de salida. Documenta cada setup con imágenes de referencia y notas. La estrategia creada se integra con el checklist system para verificar que cada operación cumple tus criterios antes de ejecutarla.',
            },
          ],
        },
        {
          icon: 'bi-phone',
          label: 'Ecosistema Móvil',
          tag: 'Mobile',
          description: 'Extensión de Clarity a dispositivos móviles con sincronización en tiempo real.',
          features: [
            {
              icon: 'bi-phone',
              label: 'App Móvil Anti-Distracciones',
              description: 'Aplicación móvil que bloquea apps y notificaciones durante tus sesiones de trading.',
              detail: 'App complementaria para iOS y Android que sincroniza con tu horario de trading en Clarity. Cuando tu sesión de Full Trading Mode se activa en el PC, la app móvil bloquea automáticamente redes sociales, juegos, mensajería y cualquier app que hayas marcado como distracción. Silencia notificaciones no esenciales y muestra una pantalla de bloqueo si intentas abrir una app restringida.',
            },
          ],
        },
        {
          icon: 'bi-fullscreen',
          label: 'Full Trading Mode Avanzado',
          tag: 'Advanced',
          description: 'Extensión del Full Trading Mode con control total sobre sesiones y reglas dinámicas.',
          features: [
            {
              icon: 'bi-fullscreen',
              label: 'Full Trading Mode Avanzado',
              description: 'Evolución del Full Trading Mode con perfiles por sesión, reglas condicionales y métricas en vivo.',
              detail: 'Versión avanzada del Full Trading Mode que añade perfiles diferenciados por sesión de mercado (Asia, Londres, Nueva York) con configuraciones independientes de workspace, checklist y reglas de riesgo para cada una. Incluye reglas condicionales inteligentes: por ejemplo, si pierdes X cantidad en la sesión, el modo se endurece automáticamente restringiendo más sitios o acortando el tiempo de sesión. Métricas en vivo dentro del overlay (P&L de la sesión, operaciones realizadas, tiempo restante) y un modo "accountability" que comparte tu estado de sesión con un mentor o compañero de trading para reforzar la disciplina externa.',
            },
          ],
        },
        {
          icon: 'bi-people',
          label: 'Comunidad &amp; IA',
          tag: 'Community',
          description: 'Funcionalidades sociales y análisis inteligente de tu trading.',
          features: [
            {
              icon: 'bi-people',
              label: 'Chats y Comunidades',
              description: 'Espacios comunitarios con canales temáticos, roles y contenido compartido.',
              detail: 'Sistema de comunidades dentro de Clarity donde los traders se organizan en grupos por estilo de trading, mercado o nivel de experiencia. Cada comunidad tiene canales temáticos, roles configurables (mentor, alumno, moderador), compartición de setups y análisis, y eventos programados como sesiones de trading en grupo o revisiones de journal colectivas.',
            },
            {
              icon: 'bi-cpu',
              label: 'Analizador de Journal con IA',
              description: 'IA que analiza tu journal de trading y detecta patrones, errores recurrentes y fortalezas.',
              detail: 'Motor de inteligencia artificial que procesa tu historial de journal y extrae insights accionables: detecta patrones de pérdida recurrentes (horarios, instrumentos, estados emocionales), identifica tus mejores setups por win rate y R:R, y genera recomendaciones semanales personalizadas. Incluye alertas proactivas cuando detecta que estás repitiendo un patrón de comportamiento negativo.',
            },
            {
              icon: 'bi-currency-exchange',
              label: 'Bloqueador de Riesgo para Forex',
              description: 'Sistema de bloqueo de riesgo específico para mercados forex con control por pares y lotes.',
              detail: 'Extensión del risk management adaptada al mercado forex. Permite configurar límites por par de divisas, tamaño máximo de lote, número máximo de operaciones simultáneas y exposición total en una divisa. Si intentas operar fuera de tus parámetros, el sistema bloquea la operación mediante API antes de que llegue al broker. Incluye alertas de correlación para evitar sobreexposición en pares correlacionados.',
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
