import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

interface FeatureDetail {
  icon: string;
  title: string;
  text: string;
}

interface Feature {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
  color: string;
  glow: string;
  highlights: string[];
  details: FeatureDetail[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.scss',
  animations: [
    trigger('detailFade', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate(
          '400ms 80ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      id: 'ftm',
      icon: 'bi-fullscreen',
      label: 'Trading',
      title: 'Full Trading Mode',
      description:
        'Transforma tu ordenador en una estación de trading pura. Clarity toma el control completo del escritorio: pantalla completa forzada, cursor confinado, Alt+Tab bloqueado. Se activa automáticamente por horario o manualmente — durante tu sesión de trading, lo único que existe es Clarity y los mercados.',
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.2)',
      highlights: ['Bloqueo de escritorio', 'Cursor confinado', 'Horario automático', 'Temporizador de sesión'],
      details: [
        {
          icon: 'bi-display',
          title: 'Pantalla completa forzada',
          text: 'La ventana de Clarity se expande a fullscreen ocultando la barra de tareas, el escritorio y cualquier otra ventana. No es posible minimizar ni redimensionar mientras el modo está activo — un entorno visual limpio donde solo existe tu estación de trading.',
        },
        {
          icon: 'bi-cursor',
          title: 'Bloqueo de cursor y foco',
          text: 'El cursor queda confinado dentro de los límites de Clarity. Imposible hacer Alt+Tab, arrastrar ventanas o acceder a la barra de tareas. Una barrera física que te mantiene enfocado durante toda la sesión.',
        },
        {
          icon: 'bi-clock-history',
          title: 'Activación programada',
          text: 'Configura hora de inicio y fin (ej. 09:30 - 16:00). El Full Trading Mode se activa automáticamente sin intervención. La hora del servidor se usa para evitar manipulaciones del reloj local. Restricción opcional a días laborables.',
        },
        {
          icon: 'bi-hourglass-split',
          title: 'Duración y temporizador',
          text: 'Establece cuánto dura tu sesión exactamente. Un temporizador permanente muestra el tiempo restante en horas:minutos:segundos. Cuando termina, el modo se desactiva automáticamente. Sesiones disciplinadas con principio y final definido.',
        },
        {
          icon: 'bi-x-circle',
          title: 'Cierre de navegadores externos',
          text: 'Al activarse, Clarity cierra automáticamente todos los navegadores abiertos (Chrome, Firefox, Edge). Elimina la posibilidad de tener redes sociales o distracciones corriendo en segundo plano.',
        },
        {
          icon: 'bi-book',
          title: 'Bloqueo de sitios educativos',
          text: 'Opción para bloquear sitios clasificados como "Learning" durante la sesión activa. Si estás operando, tu foco debe estar en operar — los cursos y artículos vuelven cuando el modo se desactiva.',
        },
      ],
    },
    {
      id: 'risk',
      icon: 'bi-shield-exclamation',
      label: 'Protección',
      title: 'Risk Blocker',
      description:
        'Tu sistema de protección contra el trading emocional. Define límites de riesgo concretos — pérdida máxima, contratos, operaciones — y bloquéalos por tiempo mediante API. Una vez bloqueados, ni siquiera tú puedes cambiarlos. El bloqueo se ejecuta a nivel de servidor: es imposible saltarlo localmente.',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.2)',
      highlights: ['Bloqueo por API', 'Irreversible por tiempo', 'Límites progresivos', 'Anti-revenge trading'],
      details: [
        {
          icon: 'bi-graph-down-arrow',
          title: 'Límites de pérdida',
          text: 'Configura pérdida máxima diaria, semanal y mensual de forma independiente. Ejemplo: $200/día, $600/semana, $1.500/mes. Al alcanzar cualquier límite, el sistema te alerta y puede bloquear la operativa.',
        },
        {
          icon: 'bi-graph-up-arrow',
          title: 'Límites de ganancia',
          text: 'Protege tus ganancias con topes diarios. El overtrading tras una buena racha es una de las causas más comunes de pérdidas. Cuando alcanzas tu objetivo, el sistema te sugiere parar.',
        },
        {
          icon: 'bi-lock-fill',
          title: 'Bloqueo temporal irreversible',
          text: 'Bloquea tu configuración por 1 día, 1 semana, 1 mes o permanente. Los campos quedan completamente deshabilitados hasta que expire el tiempo. El bloqueo se ejecuta mediante API — no puede saltarse desinstalando la app.',
        },
        {
          icon: 'bi-file-earmark-bar-graph',
          title: 'Control de posiciones',
          text: 'Máximo de contratos simultáneos, elección entre micros y minis, máximo de operaciones por sesión, máximo de stop-losses y take-profits. Cada campo se activa o desactiva individualmente.',
        },
        {
          icon: 'bi-clock',
          title: 'Temporizador de desbloqueo',
          text: 'Cuenta atrás en tiempo real mostrando exactamente cuánto falta para que puedas modificar tu configuración. Visibilidad total del estado del bloqueo en todo momento.',
        },
        {
          icon: 'bi-infinity',
          title: 'Bloqueo permanente',
          text: 'Para máxima protección: límites bloqueados para siempre. La única forma de desbloquearlos es una solicitud formal que debe ser revisada. Fricción intencional para protegerte de ti mismo.',
        },
      ],
    },
    {
      id: 'layouts',
      icon: 'bi-layout-split',
      label: 'Interfaz',
      title: 'Workspaces & Layouts',
      description:
        'Organiza tu espacio de trabajo en paneles divididos con un sistema de árbol binario. Splits horizontales y verticales ilimitados, cada panel con un sitio diferente. Guarda layouts como plantillas, cámbialos al instante y mantén múltiples workspaces independientes para análisis, ejecución o revisión.',
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.2)',
      highlights: ['Árbol binario', 'Plantillas guardables', 'Multi-workspace', 'Auto-guardado'],
      details: [
        {
          icon: 'bi-grid-1x2',
          title: 'División en árbol binario',
          text: 'Cada panel se divide horizontal o verticalmente creando una jerarquía ilimitada. Desde un simple 50/50 hasta layouts complejos con 6+ paneles en disposiciones totalmente personalizadas.',
        },
        {
          icon: 'bi-arrows-expand',
          title: 'Redimensionado por arrastre',
          text: 'Divisores arrastrables entre cada par de paneles. Ambos paneles se redimensionan proporcionalmente en tiempo real. Más espacio al gráfico, menos a las noticias — tú decides.',
        },
        {
          icon: 'bi-collection',
          title: 'Múltiples workspaces',
          text: 'Crea workspaces independientes con nombre propio: "Análisis" con TradingView y screener, "Ejecución" con broker y order book, "Review" con journal. Cada uno con su propio layout.',
        },
        {
          icon: 'bi-save',
          title: 'Plantillas de layout',
          text: 'Guarda disposiciones completas como plantillas con nombre. Almacenan estructura del árbol, proporciones de cada divisor y sitios asignados. Aplica cualquier plantilla a cualquier workspace con un clic.',
        },
        {
          icon: 'bi-window-stack',
          title: 'Plantillas de ventanas',
          text: 'Guarda el conjunto de pestañas abiertas como plantilla. Todas las URLs y su orden. Recrea un setup de investigación con 5 pestañas específicas en un segundo.',
        },
        {
          icon: 'bi-hdd',
          title: 'Auto-guardado continuo',
          text: 'Cada cambio se guarda en el servidor con debounce de 500ms. Si cierras Clarity y la reabres, todo estará exactamente como lo dejaste. Respaldo en almacenamiento local como fallback.',
        },
      ],
    },
    {
      id: 'checklist',
      icon: 'bi-check2-square',
      label: 'Disciplina',
      title: 'Trading Checklist',
      description:
        'Checklists pre-operativa que actúan como puerta de entrada obligatoria. Hasta que no completes todos los puntos, Clarity bloquea el acceso a las plataformas de ejecución — no puedes abrir una operación sin antes verificar cada punto de tu plan. Tu rutina pre-mercado convertida en requisito, no en opción.',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.2)',
      highlights: ['Bloqueo pre-trading', 'Columnas personalizables', 'Colores por estado', 'Reset diario'],
      details: [
        {
          icon: 'bi-ban',
          title: 'Bloqueo obligatorio pre-trading',
          text: 'Si activas "Requerir checklist antes de operar", Clarity bloquea la navegación a sitios de ejecución hasta que completes todos los ítems. Un overlay bloqueante aparece si intentas abrir tu broker sin haber completado la checklist. Sin atajos.',
        },
        {
          icon: 'bi-journal-plus',
          title: 'Múltiples checklists',
          text: 'Crea tantas como necesites: "Pre-Market" para calendario económico y niveles clave, "Plan de Trading" para sesgo y zonas de entrada, "Post-Market" para revisión. Cambia entre ellas al instante.',
        },
        {
          icon: 'bi-table',
          title: 'Columnas con tipos de dato',
          text: 'Columnas de texto, número, selección, multi-selección, fecha, hora o checkbox. Cada columna se puede renombrar, eliminar o redimensionar arrastrando sus bordes. Adapta la estructura a tu estrategia.',
        },
        {
          icon: 'bi-palette2',
          title: 'Selección con colores',
          text: 'Las columnas de selección soportan opciones con colores personalizados: verde para "Bullish", rojo para "Bearish", amarillo para "Neutral". Identifica visualmente el estado de cada ítem de un vistazo.',
        },
        {
          icon: 'bi-arrows',
          title: 'Columnas redimensionables',
          text: 'Arrastra el borde derecho de cualquier columna para ajustar su ancho. Más espacio para columnas de texto, menos para checkbox simples. La tabla se adapta a cualquier configuración.',
        },
        {
          icon: 'bi-floppy',
          title: 'Auto-guardado inteligente',
          text: 'Cada cambio se guarda automáticamente con debounce de 500ms. Cierre inesperado, corte de corriente — tus datos están a salvo en el servidor con respaldo local como segunda capa.',
        },
      ],
    },
  ];

  activeIndex = 0;

  get active(): Feature {
    return this.features[this.activeIndex];
  }

  offset(i: number): number {
    const n = this.features.length;
    let d = i - this.activeIndex;
    if (d > n / 2) d -= n;
    if (d < -(n / 2)) d += n;
    return d;
  }

  absOffset(i: number): number {
    return Math.abs(this.offset(i));
  }

  cardTransform(i: number): string {
    const o = this.offset(i);
    const abs = Math.abs(o);
    const sign = o >= 0 ? 1 : -1;

    // [translateX%, rotateYdeg, scale] per offset level
    const positions: [number, number, number][] = [
      [0, 0, 1],
      [72, -42, 0.78],
      [115, -68, 0.55],
    ];

    if (abs > 2) {
      return `translateX(${sign * 150}%) rotateY(${sign * -90}deg) scale(0.3)`;
    }

    const [tx, ry, s] = positions[abs];
    return `translateX(${sign * tx}%) rotateY(${sign * ry}deg) scale(${s})`;
  }

  cardOpacity(i: number): number {
    const abs = this.absOffset(i);
    return [1, 0.45, 0][abs] ?? 0;
  }

  cardZIndex(i: number): number {
    return [10, 5, 2][this.absOffset(i)] ?? 0;
  }

  select(i: number): void {
    this.activeIndex = i;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.features.length;
  }

  prev(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.features.length) % this.features.length;
  }
}
