export type FeatureStatus = 'implemented' | 'planned';
export type FeatureCategory = 'trading' | 'ui' | 'security' | 'productivity' | 'upcoming';

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
  { id: 'security', label: 'Seguridad', icon: 'bi-shield-lock', color: '#8b5cf6', glowColor: 'rgba(139, 92, 246, 0.35)' },
  { id: 'ui', label: 'UI / UX', icon: 'bi-palette', color: '#06b6d4', glowColor: 'rgba(6, 182, 212, 0.35)' },
  { id: 'productivity', label: 'Productividad', icon: 'bi-lightning-charge', color: '#f59e0b', glowColor: 'rgba(245, 158, 11, 0.35)' },
  { id: 'upcoming', label: 'Próximamente', icon: 'bi-rocket-takeoff', color: '#ec4899', glowColor: 'rgba(236, 72, 153, 0.35)' },
];

export const ROADMAP_FEATURES: RoadmapFeature[] = [
  // --- IMPLEMENTED ---
  {
    id: 'full-trading-mode',
    title: 'Full Trading Mode',
    description: 'Modo fullscreen inmersivo con bloqueo de cursor y activación por horario.',
    detail: 'Elimina distracciones por completo bloqueando el escritorio, aplicaciones y el cursor fuera de las ventanas de trading. Se activa automáticamente según el horario configurado para tus sesiones de trading.',
    category: 'trading',
    status: 'implemented',
    icon: 'bi-fullscreen',
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Bloqueos temporales configurables (1d / 1w / 1m / permanente).',
    detail: 'Configura límites de riesgo con bloqueos automáticos por tiempo. Cuando alcanzas tus límites, el sistema bloquea el acceso al trading por el período configurado, evitando decisiones emocionales.',
    category: 'trading',
    status: 'implemented',
    icon: 'bi-shield-exclamation',
  },
  {
    id: 'workspace-layouts',
    title: 'Workspace Layouts',
    description: 'Paneles split con árbol binario y plantillas guardables.',
    detail: 'Crea layouts personalizados dividiendo la pantalla en paneles con árbol binario. Guarda tus configuraciones favoritas como plantillas y cámbialas al instante. Ideal para monitorizar múltiples mercados simultáneamente.',
    category: 'ui',
    status: 'implemented',
    icon: 'bi-layout-split',
  },
  {
    id: 'whitelist-navigation',
    title: 'Whitelist Navigation',
    description: 'Solo acceso a sitios autorizados por dominio.',
    detail: 'Navegación restringida exclusivamente a dominios aprobados por el administrador. Evita distracciones y acceso a sitios no relacionados con trading. Los usuarios pueden solicitar nuevos sitios temporalmente.',
    category: 'security',
    status: 'implemented',
    icon: 'bi-list-check',
  },
  {
    id: 'admin-panel',
    title: 'Admin Panel',
    description: 'Gestión de usuarios, analíticas, logs y solicitudes.',
    detail: 'Panel completo de administración con dashboard, gestión de usuarios por roles, visor de logs en tiempo real, analíticas de uso y flujo de aprobación de solicitudes de sitios. Incluye impersonación para debugging.',
    category: 'security',
    status: 'implemented',
    icon: 'bi-gear-wide-connected',
  },
  {
    id: 'checklist-system',
    title: 'Checklist System',
    description: 'Checklists personalizadas con columnas y tipos de celda.',
    detail: 'Sistema de checklists previas al trading totalmente customizable. Crea columnas con diferentes tipos de celda (texto, check, número, selector), persiste el estado localmente y asegura que sigues tu plan antes de operar.',
    category: 'productivity',
    status: 'implemented',
    icon: 'bi-check2-square',
  },
  {
    id: 'site-requests',
    title: 'Site Requests',
    description: 'Solicitudes de sitios con acceso temporal 24h automático.',
    detail: 'Los usuarios pueden solicitar acceso a nuevos sitios. Al enviar la solicitud, obtienen acceso temporal de 24 horas inmediatamente mientras el administrador la revisa. Flujo completo de aprobación/rechazo.',
    category: 'productivity',
    status: 'implemented',
    icon: 'bi-send-plus',
  },
  {
    id: 'dark-light-theme',
    title: 'Dark & Light Theme',
    description: 'Tema oscuro y claro con cambio instantáneo.',
    detail: 'Sistema de temas con paleta Slate profesional. Cambio inmediato entre oscuro y claro con persistencia en localStorage. Todas las interfaces respetan automáticamente el tema seleccionado.',
    category: 'ui',
    status: 'implemented',
    icon: 'bi-moon-stars',
  },
  {
    id: 'jwt-auth',
    title: 'Autenticación JWT',
    description: 'Sesiones seguras con refresh automático de tokens.',
    detail: 'Sistema de autenticación basado en JWT con access y refresh tokens. Restauración automática de sesión al abrir la app, renovación silenciosa de tokens expirados y logout seguro.',
    category: 'security',
    status: 'implemented',
    icon: 'bi-key',
  },
  {
    id: 'impersonation',
    title: 'Impersonación',
    description: 'Admins pueden navegar como cualquier usuario.',
    detail: 'Los administradores pueden impersonar a cualquier usuario para debugging y soporte. La sesión de impersonación muestra un banner indicativo y permite volver a la sesión admin en cualquier momento.',
    category: 'security',
    status: 'implemented',
    icon: 'bi-person-badge',
  },
  {
    id: 'keyboard-shortcuts',
    title: 'Atajos de Teclado',
    description: 'Shortcuts rápidos para checklist y risk shield.',
    detail: 'Ctrl+Shift+C para checklist, Ctrl+Shift+X para risk shield. Acceso instantáneo a las herramientas más usadas sin quitar las manos del teclado. Los overlays se mantienen mientras se mantiene presionada la tecla.',
    category: 'productivity',
    status: 'implemented',
    icon: 'bi-keyboard',
  },
  {
    id: 'analytics',
    title: 'Analíticas de Uso',
    description: 'Dashboard de analíticas con métricas de comportamiento.',
    detail: 'Seguimiento de patrones de uso, sitios más visitados, horas de mayor actividad y métricas de productividad. Los administradores pueden ver tendencias por usuario y tomar decisiones informadas.',
    category: 'security',
    status: 'implemented',
    icon: 'bi-bar-chart-line',
  },

  // --- PLANNED ---
  {
    id: 'multi-monitor',
    title: 'Multi-Monitor',
    description: 'Soporte nativo para múltiples pantallas.',
    detail: 'Detecta monitores conectados y permite distribuir workspaces entre pantallas. Cada monitor puede tener su propio layout independiente. Ideal para setups de trading profesional con 2-6 pantallas.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-display',
  },
  {
    id: 'performance-dashboard',
    title: 'Performance Dashboard',
    description: 'Dashboard de rendimiento de trading en tiempo real.',
    detail: 'Conecta con tu broker para mostrar P&L en tiempo real, drawdown máximo, ratio riesgo/beneficio y métricas clave. Integración con los principales brokers de futuros y forex.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-speedometer2',
  },
  {
    id: 'ai-insights',
    title: 'AI Trade Insights',
    description: 'Análisis inteligente de patrones de comportamiento.',
    detail: 'Machine learning aplicado a tus patrones de trading. Detecta comportamientos de riesgo, sugiere mejoras en tu rutina y te alerta cuando estás operando fuera de tu plan. Informes semanales automatizados.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-cpu',
  },
  {
    id: 'plugin-system',
    title: 'Plugin System',
    description: 'Extensiones personalizadas para ampliar funcionalidades.',
    detail: 'Sistema de plugins que permite a la comunidad crear widgets, indicadores y herramientas personalizadas. Marketplace con plugins verificados. API abierta para desarrolladores.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-puzzle',
  },
  {
    id: 'trade-journal',
    title: 'Trade Journal',
    description: 'Diario de trading integrado con capturas automáticas.',
    detail: 'Registra cada trade automáticamente con screenshots del chart, notas, emociones y resultado. Búsqueda y filtrado avanzado. Exportación a PDF para revisión. Integración con calendarios de trading.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-journal-text',
  },
  {
    id: 'custom-hotkeys',
    title: 'Custom Hotkeys',
    description: 'Configura atajos de teclado personalizados.',
    detail: 'Define tus propios atajos de teclado para cualquier acción: cambiar workspace, abrir sites, activar overlays, capturar screenshots. Editor visual tipo VS Code keybindings.',
    category: 'productivity',
    status: 'planned',
    icon: 'bi-command',
  },
  {
    id: 'workspace-templates',
    title: 'Advanced Templates',
    description: 'Plantillas de workspace compartidas con la comunidad.',
    detail: 'Crea, exporta e importa plantillas de workspace. Marketplace de templates optimizados para diferentes estilos de trading: scalping, swing, posición. One-click setup para nuevos usuarios.',
    category: 'ui',
    status: 'planned',
    icon: 'bi-grid-1x2',
  },
  {
    id: 'mobile-companion',
    title: 'Mobile Companion',
    description: 'App móvil para alertas y monitorización remota.',
    detail: 'Aplicación complementaria para iOS y Android. Recibe alertas push de tus configuraciones de riesgo, monitoriza tu estado de trading y controla el Full Trading Mode remotamente.',
    category: 'upcoming',
    status: 'planned',
    icon: 'bi-phone',
  },
];
