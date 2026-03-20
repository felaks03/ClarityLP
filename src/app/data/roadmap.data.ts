export type FeatureStatus = 'implemented' | 'planned';
export type FeatureCategory = 'trading' | 'ui' | 'productivity' | 'upcoming';

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  detail: string;
  category: FeatureCategory;
  status: FeatureStatus;
  icon: string;
}

export interface CategoryMeta {
  id: FeatureCategory;
  label: string;
  icon: string;
  color: string;
  glowColor: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'trading', label: 'Trading', icon: 'bi-graph-up-arrow', color: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.35)' },
  { id: 'ui', label: 'UI / UX', icon: 'bi-palette', color: '#06b6d4', glowColor: 'rgba(6, 182, 212, 0.35)' },
  { id: 'productivity', label: 'Productividad', icon: 'bi-lightning-charge', color: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.35)' },
  { id: 'upcoming', label: 'Próximamente', icon: 'bi-rocket-takeoff', color: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.35)' },
];

export const ROADMAP_FEATURES: RoadmapFeature[] = [
  // --- IMPLEMENTED ---
  {
    id: 'full-trading-mode',
    title: 'Full Trading Mode',
    description: 'Modo fullscreen inmersivo con bloqueo de cursor, escritorio y activación automática por horario.',
    detail: 'Full Trading Mode convierte tu ordenador en una estación de trading pura. Al activarse, bloquea completamente el escritorio, todas las aplicaciones externas y confina el cursor exclusivamente a las ventanas de trading autorizadas — es imposible salir del entorno de trading mientras el modo está activo. Se activa automáticamente según el horario que configures para tus sesiones (por ejemplo, apertura de Londres o Nueva York), eliminando la tentación de distraerte antes o durante la operativa. Incluye un overlay a pantalla completa que impide interactuar con cualquier elemento fuera de tu workspace de trading, un temporizador visible con el tiempo restante de sesión, y desactivación automática al finalizar tu horario configurado. Es el núcleo de Clarity: disciplina forzada sin depender de tu fuerza de voluntad.',
    category: 'trading',
    status: 'implemented',
    icon: 'bi-fullscreen',
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Bloqueos temporales configurables mediante API (1d / 1w / 1m / permanente).',
    detail: 'Sistema de gestión de riesgo que te permite configurar límites y bloqueos automáticos por tiempo. Cuando alcanzas tus límites de pérdida o número de operaciones, el sistema bloquea el acceso al trading por el período que hayas configurado (1 día, 1 semana, 1 mes o permanente), evitando decisiones emocionales y revenge trading. El bloqueo se ejecuta mediante API, lo que significa que la restricción se aplica a nivel de servidor y no puede ser saltada localmente — una vez activado, ni siquiera desinstalar la app permite operar hasta que expire el período. Configura umbrales de pérdida diaria, semanal y mensual con acciones progresivas: alerta, restricción parcial o bloqueo total.',
    category: 'trading',
    status: 'implemented',
    icon: 'bi-shield-exclamation',
  },
  {
    id: 'workspace-layouts',
    title: 'Workspace Layouts',
    description: 'Paneles split con árbol binario, plantillas guardables y distribución flexible.',
    detail: 'Crea layouts personalizados dividiendo la pantalla en paneles mediante un sistema de árbol binario que permite splits horizontales y verticales ilimitados. Cada panel puede contener un sitio de trading diferente (charts, DOM, noticias, etc.). Guarda tus configuraciones favoritas como plantillas con un nombre personalizado y cámbialas al instante con un solo clic. Arrastra los bordes de los paneles para redimensionarlos en tiempo real. Ideal para monitorizar múltiples mercados, timeframes o instrumentos simultáneamente desde un único workspace organizado.',
    category: 'ui',
    status: 'implemented',
    icon: 'bi-layout-split',
  },
  {
    id: 'checklist-system',
    title: 'Checklist System',
    description: 'Checklists obligatorias pre-operativa que bloquean el acceso hasta completarse.',
    detail: 'Sistema de checklists previas al trading totalmente personalizable que actúa como puerta de entrada a tu operativa. Hasta que no completes todos los puntos de tu checklist, el sistema bloquea el acceso a las ventanas de trading — no puedes abrir una operación sin antes haber verificado cada punto de tu plan. Crea columnas con diferentes tipos de celda (texto, check, número, selector) para adaptarla a tu estrategia: confirmación de tendencia, niveles clave, estado emocional, noticias del día, etc. El estado se persiste localmente y se resetea cada sesión para forzar la revisión diaria. Es tu rutina pre-mercado convertida en un requisito obligatorio, no opcional.',
    category: 'productivity',
    status: 'implemented',
    icon: 'bi-check2-square',
  },
  {
    id: 'site-requests',
    title: 'Site Requests',
    description: 'Solicitudes de sitios con acceso temporal automático de 24h mientras se revisan.',
    detail: 'Los usuarios pueden solicitar acceso a nuevos sitios web directamente desde la aplicación. Al enviar la solicitud, obtienen acceso temporal de 24 horas de forma inmediata para no interrumpir su flujo de trabajo mientras el administrador revisa la petición. El admin puede aprobar o rechazar desde su panel, y el usuario recibe una notificación con el resultado. Incluye un historial completo de solicitudes con estado, fecha y motivo de rechazo si aplica. Permite mantener la whitelist de navegación actualizada sin fricción.',
    category: 'productivity',
    status: 'implemented',
    icon: 'bi-send-plus',
  },

  // --- PLANNED ---
  {
    id: 'mobile-distraction-blocker',
    title: 'App Móvil Anti-Distracciones',
    description: 'Aplicación móvil que bloquea apps y notificaciones durante tus sesiones de trading.',
    detail: 'App complementaria para iOS y Android que sincroniza con tu horario de trading en Clarity. Cuando tu sesión de Full Trading Mode se activa en el PC, la app móvil bloquea automáticamente redes sociales, juegos, mensajería y cualquier app que hayas marcado como distracción. Silencia notificaciones no esenciales y muestra una pantalla de bloqueo si intentas abrir una app restringida.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-phone',
  },
  {
    id: 'usage-analytics',
    title: 'Analíticas de Uso',
    description: 'Dashboard completo con métricas de comportamiento, tiempo de uso y patrones.',
    detail: 'Panel de analíticas que muestra tus patrones de uso detallados: tiempo total en sesión, sitios más visitados, horas de mayor actividad, frecuencia de uso del checklist y métricas de productividad. Gráficas de evolución semanal y mensual para identificar tendencias en tu disciplina. Los administradores pueden ver estadísticas agregadas por usuario.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-bar-chart-line',
  },
  {
    id: 'chat-system',
    title: 'Sistema de Chat',
    description: 'Chat integrado en tiempo real para comunicación directa entre traders.',
    detail: 'Sistema de mensajería en tiempo real integrado en Clarity. Permite conversaciones directas entre traders, canales por temática (futuros, forex, análisis técnico) y mensajes grupales. Comparte ideas, alertas y setups sin salir de tu entorno de trading. Historial de mensajes persistente y notificaciones configurables.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-chat-dots',
  },
  {
    id: 'ai-auto-journal',
    title: 'Journal Automático con IA',
    description: 'Diario de trading generado automáticamente por inteligencia artificial.',
    detail: 'La IA registra automáticamente cada operación con capturas del chart, hora de entrada y salida, instrumento, resultado y contexto de mercado. Genera un resumen diario con observaciones sobre tu comportamiento: si seguiste el plan, si operaste fuera de horario, si respetaste el riesgo. Reduce a cero el esfuerzo de journaling manteniendo un registro completo y objetivo de toda tu operativa.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-journal-richtext',
  },
  {
    id: 'strategy-builder',
    title: 'Creador de Estrategias',
    description: 'Herramienta visual para diseñar, documentar y seguir tus estrategias de trading.',
    detail: 'Editor visual donde defines tu estrategia paso a paso: condiciones de entrada, gestión de posición, stop loss, take profit y reglas de salida. Documenta cada setup con imágenes de referencia y notas. La estrategia creada se integra con el checklist system para verificar que cada operación cumple tus criterios antes de ejecutarla.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-diagram-3',
  },
  {
    id: 'full-trading-mode-advanced',
    title: 'Full Trading Mode Avanzado',
    description: 'Evolución del Full Trading Mode con perfiles por sesión, reglas condicionales y métricas en vivo.',
    detail: 'Versión avanzada del Full Trading Mode que añade perfiles diferenciados por sesión de mercado (Asia, Londres, Nueva York) con configuraciones independientes de workspace, checklist y reglas de riesgo para cada una. Incluye reglas condicionales inteligentes: por ejemplo, si pierdes X cantidad en la sesión, el modo se endurece automáticamente restringiendo más sitios o acortando el tiempo de sesión. Métricas en vivo dentro del overlay (P&L de la sesión, operaciones realizadas, tiempo restante) y un modo "accountability" que comparte tu estado de sesión con un mentor o compañero de trading para reforzar la disciplina externa.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-fullscreen',
  },
  {
    id: 'communities',
    title: 'Chats y Comunidades',
    description: 'Espacios comunitarios con canales temáticos, roles y contenido compartido.',
    detail: 'Sistema de comunidades dentro de Clarity donde los traders se organizan en grupos por estilo de trading, mercado o nivel de experiencia. Cada comunidad tiene canales temáticos, roles configurables (mentor, alumno, moderador), compartición de setups y análisis, y eventos programados como sesiones de trading en grupo o revisiones de journal colectivas.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-people',
  },
  {
    id: 'ai-journal-analyzer',
    title: 'Analizador de Journal con IA',
    description: 'IA que analiza tu journal de trading y detecta patrones, errores recurrentes y fortalezas.',
    detail: 'Motor de inteligencia artificial que procesa tu historial de journal y extrae insights accionables: detecta patrones de pérdida recurrentes (horarios, instrumentos, estados emocionales), identifica tus mejores setups por win rate y R:R, y genera recomendaciones semanales personalizadas. Incluye alertas proactivas cuando detecta que estás repitiendo un patrón de comportamiento negativo.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-cpu',
  },
  {
    id: 'forex-risk-blocker',
    title: 'Bloqueador de Riesgo para Forex',
    description: 'Sistema de bloqueo de riesgo específico para mercados forex con control por pares y lotes.',
    detail: 'Extensión del risk management adaptada al mercado forex. Permite configurar límites por par de divisas, tamaño máximo de lote, número máximo de operaciones simultáneas y exposición total en una divisa. Si intentas operar fuera de tus parámetros, el sistema bloquea la operación mediante API antes de que llegue al broker. Incluye alertas de correlación para evitar sobreexposición en pares correlacionados.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-currency-exchange',
  },
];
