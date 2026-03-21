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
      label: 'Disciplina',
      title: 'Full Trading Mode',
      description:
        '¿Falta de disciplina? ¿Te cuesta seguir tus normas? El Full trading mode esta pensado para no poder incumplir tus normas ni romper tu disciplina por mucho que quieras. Durante tu session de trading tendras: riesgo bloqueado, distracciones bloqueadas, navegadores externos bloqueados y mucho más.',
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.2)',
      highlights: ['Riesgo bloqueado', 'Distracciones bloqueadas', 'Horario automático'],
      details: [
        {
          icon: 'bi-display',
          title: 'Pantalla completa forzada',
          text: 'Clarity ocupa toda la pantalla y oculta la barra de tareas y el resto de ventanas. Mientras el modo está activo no se puede minimizar, redimensionar ni cerrar.',
        },
        {
          icon: 'bi-cursor',
          title: 'Cursor confinado',
          text: 'El cursor queda dentro de los límites de Clarity. No puedes hacer Alt+Tab, arrastrar ventanas ni acceder a la barra de tareas.',
        },
        {
          icon: 'bi-clock-history',
          title: 'Activación programada',
          text: 'Defines hora de inicio y fin y el modo se activa solo. Usa la hora del servidor, no la de tu PC, así que no se puede manipular el reloj. Con opción de limitarlo a días laborables.',
        },
        {
          icon: 'bi-x-circle',
          title: 'Cierre de navegadores',
          text: 'Al activarse, Clarity cierra Chrome, Firefox y Edge. No quedan redes sociales ni nada corriendo por detrás.',
        },
        {
          icon: 'bi-book',
          title: 'Bloqueo de webs de formación',
          text: 'Opción de bloquear webs categorizadas como formación durante la sesión. Si estás operando, los cursos y artículos pueden esperar.',
        },
        {
          icon: 'bi-check2-square',
          title: 'Checklist obligatoria',
          text: 'Puedes exigir completar una checklist antes de abrir cualquier web de ejecución. Hasta que marques todos los puntos, el broker aparece difuminado con un overlay que no te deja pasar.',
        },
      ],
    },
    {
      id: 'risk',
      icon: 'bi-shield-exclamation',
      label: 'Disciplina',
      title: 'Risk Blocker',
      description:
        'Define límites de pérdida y ganancia por operación, día, semana y mes. Máximo de contratos, operaciones por sesión y mucho más. Bloquea la configuración el tiempo que quieras, una vez bloqueado, no puedes cambiar nada hasta que expire.',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.2)',
      highlights: ['Bloqueo de riesgo', 'Limite de contratos', 'Bloqueo por API'],
      details: [
        {
          icon: 'bi-graph-down-arrow',
          title: 'Límites de pérdida y ganancia',
          text: 'Configura pérdida máxima y ganancia máxima por operación, por día, por semana y por mes. Cada campo se activa o desactiva individualmente — solo configuras lo que necesitas.',
        },
        {
          icon: 'bi-file-earmark-bar-graph',
          title: 'Control de posiciones',
          text: 'Máximo de contratos (micros o minis), máximo de operaciones por sesión, máximo de stop-losses y take-profits. Cada campo con su propio toggle.',
        },
        {
          icon: 'bi-lock-fill',
          title: 'Bloqueo temporal',
          text: 'Bloquea tu configuración por 1 día, 1 semana o 1 mes. Los campos quedan deshabilitados hasta que expire el tiempo. Una cuenta atrás te muestra cuánto falta.',
        },
        {
          icon: 'bi-infinity',
          title: 'Bloqueo permanente',
          text: 'Límites bloqueados para siempre. Solo se pueden desbloquear enviando una solicitud que tiene que ser revisada.',
        },
        {
          icon: 'bi-toggles',
          title: 'Campos individuales',
          text: 'Cada límite tiene su propio toggle. Activas solo los que te sirven y dejas el resto desactivado. Los cambios se guardan automáticamente.',
        },
        {
          icon: 'bi-display',
          title: 'Bloqueo durante sesión',
          text: 'Mientras el Full Trading Mode está activo, todos los campos de riesgo quedan deshabilitados. No puedes ajustar límites a mitad de sesión.',
        },
      ],
    },
    {
      id: 'layouts',
      icon: 'bi-layout-split',
      label: 'Organizacion',
      title: 'Workspaces & Layouts',
      description:
        'Ten todas tus aplicaciones de trading en el mismo workspace, divide la pantalla en paneles con splits horizontales y verticales, cada uno con una web diferente. Guarda tus layouts favoritos.',
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.2)',
      highlights: ['Vista Multi-web', 'Organizacion personalizada', 'Guardado de layouts'],
      details: [
        {
          icon: 'bi-grid-1x2',
          title: 'Paneles divididos',
          text: 'Cada panel se puede dividir horizontal o verticalmente, creando un árbol de paneles. Desde un split simple de dos hasta layouts con múltiples paneles en cualquier disposición.',
        },
        {
          icon: 'bi-arrows-expand',
          title: 'Redimensionado por arrastre',
          text: 'Divisores arrastrables entre cada par de paneles. Ambos lados se redimensionan proporcionalmente en tiempo real.',
        },
        {
          icon: 'bi-collection',
          title: 'Múltiples workspaces',
          text: 'Crea workspaces independientes con nombre propio: uno para análisis con TradingView y screener, otro para ejecución con el broker, otro para revisión. Cada uno con su propio layout.',
        },
        {
          icon: 'bi-save',
          title: 'Plantillas de layout',
          text: 'Guarda cualquier disposición como plantilla con nombre. Almacena la estructura del árbol, las proporciones de cada divisor y las webs asignadas. Aplicable a cualquier workspace.',
        },
        {
          icon: 'bi-arrows',
          title: 'Mover y reorganizar paneles',
          text: 'Modo de movimiento para intercambiar la posición de dos paneles. Seleccionas uno, haces clic en el destino y se intercambian.',
        },
        {
          icon: 'bi-hdd',
          title: 'Auto-guardado',
          text: 'Cada cambio se guarda automáticamente. Si cierras Clarity y la reabres, todo está exactamente como lo dejaste.',
        },
      ],
    },
    {
      id: 'checklist',
      icon: 'bi-check2-square',
      label: 'Responsabilidad',
      title: 'Trading Checklist',
      description:
        'Personaliza tu estrategia al máximo. Listas con columnas de texto, número, selects, multi-select, fecha, hora y checkbox. Puedes tener varias checklists y hacer que completar una sea obligatorio antes de operar.',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.2)',
      highlights: ['Crea tu estrategia', 'Multiples Checklists', 'Bloqueo pre-trading'],
      details: [
        {
          icon: 'bi-table',
          title: 'Columnas con tipos de dato',
          text: 'Cada columna tiene su tipo: texto, número, checkbox, selección, multi-selección, fecha u hora. Adaptas la estructura a lo que necesite tu estrategia.',
        },
        {
          icon: 'bi-palette2',
          title: 'Selección con colores',
          text: 'Las columnas de selección soportan opciones con colores: verde para alcista, rojo para bajista, amarillo para neutral. Se lee de un vistazo.',
        },
        {
          icon: 'bi-journal-plus',
          title: 'Múltiples checklists',
          text: 'Crea tantas como necesites: una pre-market, otra para el plan de trading, otra post-sesión. Cambias entre ellas desde un selector.',
        },
        {
          icon: 'bi-ban',
          title: 'Bloqueo pre-trading',
          text: 'Si activas la opción, Clarity difumina las webs de ejecución y muestra un overlay hasta que completes todos los puntos de la checklist.',
        },
        {
          icon: 'bi-arrows',
          title: 'Columnas redimensionables',
          text: 'Arrastra el borde de cualquier columna para ajustar su ancho. Más espacio para texto largo, menos para checkboxes.',
        },
        {
          icon: 'bi-floppy',
          title: 'Auto-guardado',
          text: 'Cada cambio se guarda automáticamente. Cierre inesperado, corte de corriente — tus datos están a salvo.',
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
