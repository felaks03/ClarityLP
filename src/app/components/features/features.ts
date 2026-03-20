import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger, animateChild } from '@angular/animations';

interface FeatureDetail {
  icon: string;
  title: string;
  text: string;
}

interface Feature {
  icon: string;
  iconLabel: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  details: FeatureDetail[];
  expanded: boolean;
}

@Component({
  selector: 'app-features',
  standalone: true,
  templateUrl: './features.html',
  styleUrl: './features.scss',
  animations: [
    trigger('expandContent', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ height: '*', opacity: 1 })),
        query('@detailStagger', animateChild(), { optional: true }),
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.25, 0, 0.6, 1)', style({ height: 0, opacity: 0 })),
      ]),
    ]),
    trigger('detailStagger', [
      transition(':enter', [
        query('.detail-item', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger('50ms', [
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('rotateChevron', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', [animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
    ]),
  ],
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'bi-fullscreen',
      iconLabel: 'Icono de pantalla completa: representa el modo inmersivo que ocupa todo el escritorio',
      title: 'Full Trading Mode',
      subtitle: 'Entorno inmersivo de operativa sin distracciones',
      description:
        'El Full Trading Mode transforma tu ordenador en una estación de trading dedicada. Al activarlo, Clarity toma el control completo del escritorio: la ventana pasa a pantalla completa, el cursor queda confinado dentro de la aplicación y no es posible cambiar a otras ventanas ni usar Alt+Tab. Esto significa que durante tu sesión de trading, lo único que existe es Clarity y los mercados. Puedes activar el modo manualmente con un botón, o configurar un horario para que se active automáticamente cada día a la hora que elijas (por ejemplo, a las 9:30 para la apertura del mercado americano). También puedes limitar la activación solo a días laborables para evitar sesiones en fin de semana.',
      color: '#3b82f6',
      expanded: false,
      details: [
        {
          icon: 'bi-display',
          title: 'Pantalla completa forzada',
          text: 'Al activar el modo, la ventana de Clarity se expande automáticamente a pantalla completa, ocultando la barra de tareas del sistema operativo, el escritorio y cualquier otra ventana visible. No es posible minimizar ni redimensionar la ventana mientras el modo está activo, garantizando un entorno visual limpio donde solo existe tu estación de trading.',
        },
        {
          icon: 'bi-cursor',
          title: 'Bloqueo de cursor y foco',
          text: 'El cursor del ratón queda confinado dentro de los límites de la ventana de Clarity. Esto impide hacer Alt+Tab, arrastrar ventanas desde los bordes o acceder a la barra de tareas. Combinado con la pantalla completa, crea una barrera física que te mantiene dentro de la aplicación durante toda la sesión. Si necesitas salir, debes desactivar el modo primero.',
        },
        {
          icon: 'bi-clock-history',
          title: 'Activación programada por horario',
          text: 'Configura una hora de inicio y una hora de fin en formato HH:mm (por ejemplo, 09:30 - 16:00). Cuando llegue la hora programada, el Full Trading Mode se activa automáticamente sin necesidad de intervención. Ideal para traders que operan en horarios fijos como la sesión europea (08:00-12:00) o la sesión americana (15:30-22:00). El sistema utiliza la hora del servidor para evitar manipulaciones del reloj local.',
        },
        {
          icon: 'bi-hourglass-split',
          title: 'Duración configurable de sesión',
          text: 'Establece exactamente cuántos minutos u horas durará tu sesión de trading. Una vez transcurrido el tiempo configurado, el modo se desactiva automáticamente y tu escritorio vuelve a la normalidad. Esto te ayuda a mantener sesiones disciplinadas con un principio y un final definidos, evitando sesiones interminables que deterioran tu rendimiento.',
        },
        {
          icon: 'bi-calendar-week',
          title: 'Restricción a días laborables',
          text: 'Activa esta opción para que el horario programado solo funcione de lunes a viernes. Aunque llegue la hora configurada, si es sábado o domingo el modo no se activará. Perfecto para traders de mercados que solo operan entre semana, evitando activaciones accidentales en fin de semana.',
        },
        {
          icon: 'bi-x-circle',
          title: 'Cierre automático de otros navegadores',
          text: 'Opción para que al activar el Full Trading Mode, Clarity envíe una señal al sistema operativo para cerrar todos los demás navegadores abiertos (Chrome, Firefox, Edge, etc.). Esto elimina la posibilidad de que tengas un navegador con redes sociales o contenido de distracción corriendo en segundo plano.',
        },
        {
          icon: 'bi-stopwatch',
          title: 'Temporizador en tiempo real',
          text: 'Mientras el modo está activo, un temporizador permanente aparece en la barra de título de Clarity mostrando el tiempo restante de la sesión en formato horas:minutos:segundos. Siempre sabes exactamente cuánto tiempo te queda de sesión sin necesidad de consultar ningún reloj externo.',
        },
        {
          icon: 'bi-book',
          title: 'Bloqueo de sitios educativos en sesión',
          text: 'Opción configurable para bloquear automáticamente todos los sitios clasificados como "Learning" mientras el Full Trading Mode está activo. La idea es sencilla: si estás en sesión de trading, tu foco debe estar en operar, no en ver cursos o leer artículos. Los sitios educativos vuelven a estar disponibles cuando el modo se desactiva.',
        },
      ],
    },
    {
      icon: 'bi-shield-lock',
      iconLabel: 'Icono de escudo con candado: representa la protección contra decisiones impulsivas',
      title: 'Risk Shield',
      subtitle: 'Gestión de riesgo con bloqueo temporal automático',
      description:
        'Risk Shield es el sistema de protección contra el trading emocional. Te permite definir límites de riesgo muy concretos (pérdida máxima diaria, semanal, mensual, máximo de contratos, máximo de operaciones...) y luego bloquearlos por tiempo para que no puedas modificarlos en caliente. La clave está en que configuras tus límites cuando estás tranquilo y con la mente clara, y luego los bloqueas por 1 día, 1 semana, 1 mes o de forma permanente. Una vez bloqueados, ni siquiera tú puedes cambiarlos hasta que expire el tiempo. Es tu versión más racional protegiendo a tu versión emocional.',
      color: '#8b5cf6',
      expanded: false,
      details: [
        {
          icon: 'bi-graph-down-arrow',
          title: 'Límites de pérdida máxima',
          text: 'Configura tu pérdida máxima tolerada en tres niveles temporales independientes: diario, semanal y mensual. Cada nivel funciona de forma autónoma. Por ejemplo, puedes establecer $200 de pérdida máxima diaria, $600 semanal y $1.500 mensual. Cuando alcanzas cualquiera de estos límites, el sistema te notifica con una alerta para que detengas la operativa.',
        },
        {
          icon: 'bi-graph-up-arrow',
          title: 'Límites de ganancia máxima',
          text: 'Establece un tope de ganancia diario, semanal y mensual para proteger tus ganancias. Puede sonar contraintuitivo, pero el overtrading tras una buena racha es una de las causas más comunes de pérdidas. Si estableces $400 de ganancia máxima diaria y la alcanzas, el sistema te sugiere que dejes de operar ese día y protejas lo conseguido.',
        },
        {
          icon: 'bi-file-earmark-bar-graph',
          title: 'Control de tamaño de posiciones',
          text: 'Configura el número máximo de contratos que puedes tener abiertos simultáneamente y elige entre micros y minis para diferentes niveles de riesgo. También puedes definir el máximo de operaciones por sesión, el máximo de stop-losses permitidos y el máximo de take-profits. Cada uno de estos campos se puede activar o desactivar individualmente según tu estrategia.',
        },
        {
          icon: 'bi-lock-fill',
          title: 'Bloqueo temporal de configuración',
          text: 'Una vez que hayas configurado tus límites, puedes bloquearlos por un periodo de tiempo: 1 día, 1 semana o 1 mes. Durante ese periodo, los campos de configuración quedan completamente deshabilitados y no es posible modificar ningún valor. El bloqueo se activa con un solo clic y es irreversible hasta que expire el tiempo. Es el mecanismo central que impide que tomes decisiones impulsivas después de una mala racha.',
        },
        {
          icon: 'bi-infinity',
          title: 'Bloqueo permanente',
          text: 'Para traders que quieren la máxima protección, existe la opción de bloqueo "para siempre". Una vez activado, los límites quedan permanentemente bloqueados y la única forma de desbloquearlos es enviar una solicitud formal de desbloqueo que debe ser revisada. Esto añade una capa extra de fricción que te obliga a reflexionar antes de cambiar tus límites.',
        },
        {
          icon: 'bi-clock',
          title: 'Temporizador de desbloqueo en tiempo real',
          text: 'Mientras tus límites estén bloqueados, el panel Risk Shield muestra un temporizador que cuenta hacia atrás en tiempo real mostrando exactamente cuántos días, horas, minutos y segundos faltan para que puedas modificar tu configuración. Esto te da visibilidad total del estado del bloqueo en todo momento.',
        },
        {
          icon: 'bi-keyboard',
          title: 'Acceso rápido desde cualquier vista',
          text: 'Abre el panel Risk Shield en cualquier momento pulsando Ctrl+Shift+X. Aparece como un panel lateral deslizante que se superpone a tu contenido sin interrumpir tu flujo de trabajo. Puedes configurarlo para que se cierre automáticamente al hacer clic fuera de él, o mantenerlo fijado mientras operas para tener tus límites siempre visibles.',
        },
      ],
    },
    {
      icon: 'bi-layout-split',
      iconLabel: 'Icono de paneles divididos: representa la organización visual de múltiples sitios en pantalla',
      title: 'Workspaces & Layouts',
      subtitle: 'Sistema multipanel con plantillas guardables',
      description:
        'El sistema de Workspaces permite organizar tu espacio de trabajo de forma avanzada. Puedes dividir la pantalla en múltiples paneles (horizontal y verticalmente) formando una estructura de árbol donde cada rama es un panel con un sitio web diferente. Por ejemplo, puedes tener TradingView en la mitad izquierda y tu plataforma de ejecución en la derecha, o dividir la pantalla en cuatro cuadrantes con gráficos, noticias, journal y ejecución. Puedes crear varios workspaces independientes (por ejemplo, uno para análisis y otro para ejecución), guardar cualquier disposición como plantilla con nombre, y restaurarla en cualquier momento con un solo clic.',
      color: '#06b6d4',
      expanded: false,
      details: [
        {
          icon: 'bi-grid-1x2',
          title: 'División en árbol binario',
          text: 'El sistema de layout utiliza una estructura de árbol binario para organizar los paneles. Cada panel se puede dividir horizontal o verticalmente, creando dos paneles hijos. Cada uno de esos paneles hijos se puede dividir de nuevo, creando una jerarquía de niveles ilimitada. Este enfoque permite configuraciones muy flexibles: desde una simple división 50/50 hasta layouts complejos con 6 o más paneles en disposiciones totalmente personalizadas.',
        },
        {
          icon: 'bi-arrows-expand',
          title: 'Redimensionado de paneles por arrastre',
          text: 'Entre cada par de paneles hay un divisor arrastrable. Al mover el divisor, ambos paneles se redimensionan proporcionalmente en tiempo real. Funciona tanto para divisiones horizontales (arrastrando el divisor de izquierda a derecha) como verticales (de arriba a abajo). Esto te permite dar más espacio al gráfico y menos al panel de noticias, o cualquier proporción que necesites.',
        },
        {
          icon: 'bi-collection',
          title: 'Múltiples workspaces independientes',
          text: 'Crea tantos workspaces como necesites, cada uno con su propio nombre y su propia disposición de paneles completamente independiente. Puedes tener un workspace llamado "Análisis" con TradingView y screener, otro llamado "Ejecución" con tu broker y el order book, y otro "Review" con tu journal y estadísticas. Cada workspace es un mundo aparte con su propio layout.',
        },
        {
          icon: 'bi-arrow-left-right',
          title: 'Cambio instantáneo entre workspaces',
          text: 'En el sidebar aparecen pestañas con todos tus workspaces. Un solo clic cambia el workspace activo al instante, cargando su layout de paneles correspondiente. La transición es instantánea porque todos los paneles se mantienen en memoria. Puedes renombrar workspaces con doble clic y eliminar los que ya no necesites (siempre se mantiene al menos uno).',
        },
        {
          icon: 'bi-save',
          title: 'Plantillas de layout guardables',
          text: 'Guarda la disposición actual de paneles como una plantilla con nombre personalizado. Las plantillas almacenan la estructura completa del árbol de paneles, las proporciones de cada divisor y los sitios web asignados. Luego puedes aplicar cualquier plantilla a cualquier workspace, replicando exactamente la misma configuración. Puedes renombrar y eliminar plantillas desde el mismo selector.',
        },
        {
          icon: 'bi-window-stack',
          title: 'Plantillas de ventanas (tabs)',
          text: 'Además de las plantillas de layout (paneles), puedes guardar el conjunto de pestañas abiertas como una plantilla de ventanas. Esto almacena todas las URLs activas y su orden. Útil para recrear rápidamente un setup de investigación con 5 pestañas específicas, o un setup de ejecución con tu broker y herramientas auxiliares.',
        },
        {
          icon: 'bi-hdd',
          title: 'Auto-guardado continuo',
          text: 'Cada vez que modificas un layout (mover divisor, añadir panel, cambiar sitio), el cambio se guarda automáticamente en el servidor con un debounce de 500ms. Esto significa que si cierras Clarity y la vuelves a abrir, todo estará exactamente como lo dejaste. También se mantiene un respaldo en almacenamiento local como fallback.',
        },
      ],
    },
    {
      icon: 'bi-globe2',
      iconLabel: 'Icono de globo terráqueo: representa la navegación web controlada y filtrada',
      title: 'Navegación Segura & Whitelist',
      subtitle: 'Filtrado de dominios con acceso temporal bajo demanda',
      description:
        'Clarity funciona como un navegador web, pero con una diferencia fundamental: durante el Full Trading Mode, solo puedes acceder a sitios web autorizados (whitelist). Si intentas navegar a un dominio que no está en la lista, la navegación se bloquea y recibes un aviso. Esto elimina la posibilidad de abrir redes sociales, YouTube, o cualquier otro sitio de distracción mientras operas. Si necesitas un sitio nuevo, puedes enviar una solicitud de acceso indicando el nombre, la URL, la categoría del sitio y un motivo. Al enviar la solicitud, obtienes acceso temporal inmediato durante 24 horas mientras tu petición es revisada. Si es aprobada, el sitio pasa a la whitelist permanente.',
      color: '#22c55e',
      expanded: false,
      details: [
        {
          icon: 'bi-shield-check',
          title: 'Whitelist estricta durante trading',
          text: 'Durante el Full Trading Mode, Clarity filtra todas las peticiones de red a nivel de aplicación. Solo los dominios presentes en la whitelist pueden cargarse en los paneles y pestañas del navegador. Si introduces una URL de un dominio no autorizado (por ejemplo, twitter.com), la navegación se bloquea inmediatamente y se muestra un aviso claro indicando que el dominio no está permitido. El filtrado se aplica al dominio base, por lo que si tradingview.com está autorizado, todas sus subpáginas también lo están.',
        },
        {
          icon: 'bi-send-plus',
          title: 'Solicitud de acceso a nuevos sitios',
          text: 'Desde la sección "Solicitar Sitio" en Ajustes, puedes enviar una petición para que un nuevo sitio se añada a la whitelist. El formulario te pide el nombre del sitio, su URL completa, la categoría a la que pertenece (Learning, Planning, Analysing, Executing, Journaling o Waiting) y opcionalmente un motivo. Al enviar la solicitud, el sistema registra la petición y te concede acceso temporal inmediato al dominio durante 24 horas.',
        },
        {
          icon: 'bi-hourglass-top',
          title: 'Acceso temporal automático de 24 horas',
          text: 'Cada vez que envías una solicitud de acceso, obtienes 24 horas de acceso temporal al dominio solicitado sin esperar aprobación. Esto te permite usar el sitio inmediatamente mientras tu petición es evaluada. El temporizador de acceso temporal es visible en la sección de solicitudes y el dominio temporal se añade dinámicamente a la lista de sitios permitidos. Pasadas las 24 horas, si la solicitud no ha sido aprobada, el acceso se revoca automáticamente.',
        },
        {
          icon: 'bi-tags',
          title: 'Categorías de flujo de trabajo',
          text: 'Todos los sitios de la whitelist están organizados en seis categorías que representan las fases del flujo de trading: Learning (formación y cursos), Planning (planificación de sesiones), Analysing (análisis técnico y fundamental), Executing (plataformas de ejecución de órdenes), Journaling (diarios y revisión de operaciones) y Waiting (noticias y contenido para tiempos de espera). Estas categorías se usan para organizar el sidebar y para aplicar reglas específicas como el bloqueo de sitios educativos.',
        },
        {
          icon: 'bi-link-45deg',
          title: 'Normalización automática de URLs',
          text: 'Cuando introduces una URL, el sistema la normaliza automáticamente: añade el protocolo https:// si no lo has escrito, elimina el prefijo "www.", convierte todo a minúsculas y extrae el dominio base. Esto significa que escribir "tradingview.com", "https://www.TradingView.com" o "TRADINGVIEW.COM" produce exactamente el mismo resultado. La normalización se aplica tanto al introducir URLs en la barra de direcciones como al enviar solicitudes de acceso.',
        },
        {
          icon: 'bi-eye-slash',
          title: 'Notificación de bloqueo clara',
          text: 'Cuando intentas acceder a un sitio no autorizado, en lugar de una página de error genérica, Clarity muestra un mensaje claro y bien diseñado explicando que la navegación ha sido bloqueada porque el dominio no está en la whitelist. El mensaje incluye el dominio que has intentado visitar y te sugiere enviar una solicitud de acceso si consideras que el sitio es necesario para tu operativa.',
        },
      ],
    },
    {
      icon: 'bi-check2-square',
      iconLabel: 'Icono de casilla marcada: representa las listas de verificación previas a la operativa',
      title: 'Trading Checklist',
      subtitle: 'Listas de verificación configurables con requisito pre-trading',
      description:
        'El sistema de Checklist te permite crear listas de verificación completamente personalizadas que puedes revisar antes de cada sesión de trading. Cada checklist es como una mini tabla: defines columnas con el tipo de dato que necesites (texto, número, fecha, selección con colores, checkbox...) y creas filas con tus ítems a verificar. La funcionalidad más potente es la opción de "requisito pre-trading": si la activas, Clarity bloqueará el acceso a sitios de ejecución hasta que hayas completado todos los ítems de tu checklist. Esto te obliga a seguir tu plan antes de tocar un solo botón de tu broker.',
      color: '#f59e0b',
      expanded: false,
      details: [
        {
          icon: 'bi-journal-plus',
          title: 'Gestión de múltiples checklists',
          text: 'Crea tantas checklists como necesites, cada una con un nombre personalizado. Por ejemplo, puedes tener una checklist "Pre-Market" para verificar que has revisado el calendario económico y los niveles clave, otra "Plan de Trading" para confirmar tu sesgo y zonas de entrada, y otra "Post-Market" para la revisión del día. Puedes cambiar entre checklists al instante, renombrarlas o eliminar las que ya no uses.',
        },
        {
          icon: 'bi-table',
          title: 'Columnas con tipos de dato personalizados',
          text: 'Cada checklist tiene su propia estructura de columnas. Puedes añadir columnas de tipo texto (para notas libres), número (para valores numéricos), selección (menú desplegable con opciones predefinidas), multi-selección (varias opciones a la vez), fecha (con selector de calendario), hora (con selector de hora) o checkbox (marcado/desmarcado). Cada columna se puede renombrar, eliminar o redimensionar arrastrando sus bordes.',
        },
        {
          icon: 'bi-palette2',
          title: 'Opciones de selección con colores personalizados',
          text: 'Las columnas de tipo selección y multi-selección soportan opciones con colores personalizados. Puedes asignar un color a cada opción (por ejemplo, verde para "Bullish", rojo para "Bearish", amarillo para "Neutral") usando una paleta de colores integrada. Los colores se muestran como fondo de la celda, permitiendo identificar visualmente el estado de cada ítem de un vistazo rápido sin necesidad de leer el texto.',
        },
        {
          icon: 'bi-ban',
          title: 'Requisito obligatorio pre-trading',
          text: 'Esta es la funcionalidad más potente de la checklist. Si activas la opción "Requerir checklist antes de operar", Clarity bloqueará la navegación a cualquier sitio de categoría "Executing" (plataformas de trading) hasta que todos los ítems de la checklist activa estén completados. Si intentas abrir tu broker sin haber completado la checklist, aparece un overlay bloqueante con la checklist para que la completes primero. No hay forma de saltarse este paso.',
        },
        {
          icon: 'bi-box-arrow-in-right',
          title: 'Panel lateral flotante con atajo de teclado',
          text: 'No necesitas ir a Ajustes para usar la checklist. Pulsa Ctrl+Shift+C en cualquier momento y la checklist aparece como un panel flotante en la esquina inferior derecha de la pantalla, superpuesto a tu contenido actual. Puedes marcar ítems, editar celdas y revisar el estado sin perder de vista tus gráficos. Si lo prefieres, puedes configurar que se cierre automáticamente al hacer clic fuera de él.',
        },
        {
          icon: 'bi-arrows',
          title: 'Columnas redimensionables con arrastre',
          text: 'Cada columna de la checklist se puede redimensionar arrastrando el borde derecho de su cabecera. Esto te permite dar más espacio a columnas de texto que necesitan más contenido y reducir columnas simples como checkbox o fecha. La tabla se adapta a cualquier configuración de anchos que necesites.',
        },
        {
          icon: 'bi-floppy',
          title: 'Auto-guardado inteligente continuo',
          text: 'Cada cambio que haces en la checklist (marcar un ítem, editar una celda, añadir una columna, reordenar filas) se guarda automáticamente en el servidor con un debounce de 500ms. Esto significa que si cierras la aplicación sin querer, o pierdes conexión, tus datos están a salvo. También se mantiene un respaldo en almacenamiento local como segunda capa de seguridad.',
        },
      ],
    },
    {
      icon: 'bi-window-stack',
      iconLabel: 'Icono de ventanas apiladas: representa la gestión avanzada de múltiples pestañas simultáneas',
      title: 'Navegador Multi-Tab',
      subtitle: 'Navegación con pestañas persistentes y plantillas',
      description:
        'Clarity integra un navegador web completo con un sistema de pestañas avanzado. Puedes abrir múltiples sitios en pestañas independientes, cada una con su propio historial de navegación y botones de atrás/adelante. Las pestañas se reordenan con drag & drop y permanecen cargadas en segundo plano incluso cuando no son visibles, lo que permite cambiar entre ellas al instante sin tiempos de recarga. También puedes guardar todas tus pestañas abiertas como una plantilla de ventanas y restaurarla en cualquier momento.',
      color: '#06d6a0',
      expanded: false,
      details: [
        {
          icon: 'bi-plus-circle',
          title: 'Creación de pestañas con historial independiente',
          text: 'Cada pestaña que abres funciona como un navegador independiente con su propio historial de navegación. Si abres TradingView en una pestaña y navegas a varias subpáginas, los botones de atrás y adelante de esa pestaña reflejan su historial individual. El estado de navegación (canGoBack, canGoForward) se trackea por pestaña, y la pestaña activa se indica visualmente en la barra de pestañas.',
        },
        {
          icon: 'bi-grip-vertical',
          title: 'Reordenación por arrastre',
          text: 'Las pestañas se pueden reorganizar arrastrándolas a la posición deseada. Esto te permite mantener los sitios más importantes a la izquierda para acceso rápido y organizar las pestañas según tu flujo de trabajo. El orden se persiste automáticamente, así que al reiniciar Clarity las pestañas mantienen la posición que les asignaste.',
        },
        {
          icon: 'bi-eye',
          title: 'Pestañas persistentes en segundo plano',
          text: 'A diferencia de un navegador convencional que descarga pestañas inactivas para ahorrar memoria, Clarity mantiene todas las pestañas cargadas y activas en segundo plano. Cuando cambias de pestaña, la anterior no se destruye ni se recarga — simplemente se oculta. Al volver a ella, aparece al instante con su estado exacto (scroll, formularios, autenticación) tal como la dejaste.',
        },
        {
          icon: 'bi-input-cursor-text',
          title: 'Barra de direcciones con verificación',
          text: 'La barra de direcciones permite navegar manualmente a cualquier URL. Al escribir una dirección y confirmar, el sistema normaliza la URL automáticamente y verifica si el dominio está en la whitelist antes de navegar. Si el dominio no está autorizado y el Full Trading Mode está activo, la navegación se bloquea. La barra muestra la URL actual de la pestaña activa en todo momento.',
        },
        {
          icon: 'bi-download',
          title: 'Plantillas de ventanas guardables',
          text: 'Guarda el conjunto completo de pestañas abiertas (con todas sus URLs) como una plantilla con nombre. Por ejemplo, puedes crear una plantilla "Setup Análisis" con TradingView, Finviz, el calendario económico y tu screener favorito. Con un clic restauras esas cuatro pestañas con sus URLs exactas. Las plantillas se pueden renombrar, eliminar y reutilizar en cualquier momento.',
        },
        {
          icon: 'bi-x-lg',
          title: 'Gestión flexible de pestañas',
          text: 'Cierra pestañas individualmente con el botón de cierre de cada una. Al cerrar la pestaña activa, Clarity activa automáticamente la siguiente pestaña disponible. Si estás en modo workspace (multipanel), las pestañas funcionan como el modo "Windows" del sidebar, mientras que los paneles funcionan como el modo "Workspace". Puedes alternar entre ambos modos con un toggle en el sidebar.',
        },
      ],
    },
    {
      icon: 'bi-bell',
      iconLabel: 'Icono de campana: representa el sistema de alertas y notificaciones del sistema',
      title: 'Alertas & Notificaciones',
      subtitle: 'Notificaciones en tiempo real con niveles de severidad',
      description:
        'Clarity cuenta con un sistema de alertas que te mantiene informado de todo lo relevante: cuándo has alcanzado un límite de riesgo, cuándo se ha desbloqueado tu configuración, cuándo una solicitud de sitio ha sido procesada, o cuándo ha ocurrido algo importante en el sistema. Las alertas se clasifican por niveles de severidad (informativas, advertencias y críticas) y se acumulan en un panel del sidebar con un badge numérico que muestra cuántas tienes sin leer.',
      color: '#ef4444',
      expanded: false,
      details: [
        {
          icon: 'bi-exclamation-triangle',
          title: 'Tres niveles de severidad',
          text: 'Cada alerta tiene un nivel asignado: "info" para notificaciones informativas (solicitud de sitio aprobada, bloqueo desbloqueado), "warning" para advertencias que requieren atención (te estás acercando a un límite de riesgo, acceso temporal a punto de expirar), y "critical" para situaciones urgentes (límite de pérdida alcanzado, intento de acceso no autorizado). Cada nivel tiene un estilo visual distinto con colores e iconos diferenciados para que identifiques la importancia de un vistazo.',
        },
        {
          icon: 'bi-card-text',
          title: 'Alertas con información detallada',
          text: 'Cada alerta incluye un título descriptivo, un mensaje con todos los detalles del evento, la fecha y hora exacta en que ocurrió, y metadatos contextuales adicionales. No son simples notificaciones genéricas: cada alerta te da toda la información que necesitas para entender qué ha pasado y por qué, sin tener que investigar por tu cuenta.',
        },
        {
          icon: 'bi-check2-all',
          title: 'Gestión de estado de lectura',
          text: 'Las alertas se marcan como leídas o no leídas. Puedes marcar alertas individuales como leídas haciendo clic en ellas, o usar el botón "Marcar todas como leídas" para limpiar tu bandeja de un golpe. El estado de lectura se sincroniza con el servidor, así que si lees una alerta en un dispositivo, aparece como leída en cualquier otro.',
        },
        {
          icon: 'bi-app-indicator',
          title: 'Badge de notificaciones en el sidebar',
          text: 'En el sidebar, junto al icono de alertas, aparece un badge numérico que muestra la cantidad exacta de alertas sin leer. Este badge se actualiza automáticamente cada vez que llega una nueva alerta o marcas alguna como leída. Si no tienes alertas sin leer, el badge desaparece. Es una forma discreta pero efectiva de saber si hay algo pendiente de revisar sin necesidad de abrir el panel.',
        },
        {
          icon: 'bi-trash3',
          title: 'Limpieza y descarte de alertas',
          text: 'Descarta alertas individuales que ya no te interesan con un botón de eliminar, o usa la opción "Limpiar todas" para vaciar completamente el panel de alertas. Las alertas descartadas se eliminan permanentemente. Esto te permite mantener tu panel limpio mostrando solo las alertas que consideras relevantes.',
        },
      ],
    },
    {
      icon: 'bi-palette',
      iconLabel: 'Icono de paleta: representa la personalización visual y configuración de la interfaz',
      title: 'Personalización & Ajustes',
      subtitle: 'Tema visual, sidebar personalizable y panel de configuración centralizado',
      description:
        'Clarity se adapta a tu forma de trabajar. Puedes cambiar entre tema oscuro y claro con un solo clic, reorganizar los sitios del sidebar arrastrándolos, personalizar tu perfil con nombre y email, y consultar todos los atajos de teclado disponibles. Todo se gestiona desde un panel de Ajustes centralizado con secciones dedicadas para cada área: Perfil, General, Trading, Checklist, Apariencia, Atajos y Solicitud de sitios. Cada cambio se guarda automáticamente.',
      color: '#ec4899',
      expanded: false,
      details: [
        {
          icon: 'bi-moon-stars',
          title: 'Tema oscuro y claro con cambio instantáneo',
          text: 'Cambia entre el tema oscuro (fondo #0F172A con tonos azul-gris) y el tema claro (fondo blanco con tonos grises suaves) desde la sección Apariencia de Ajustes. El cambio se aplica instantáneamente a todos los componentes de la interfaz sin necesidad de recargar. Tu preferencia se almacena en el navegador y se recuerda entre sesiones. El tema oscuro es el predeterminado, diseñado para reducir la fatiga visual en sesiones largas de trading.',
        },
        {
          icon: 'bi-list-nested',
          title: 'Sidebar con arrastre para reordenar sitios',
          text: 'El sidebar lateral muestra tus sitios de la whitelist organizados con iconos para acceso rápido con un solo clic. Puedes reorganizar el orden de los sitios arrastrándolos arriba o abajo, añadir nuevos sitios al sidebar desde la lista de sitios disponibles, o eliminar los que no uses frecuentemente. También puedes colapsar el sidebar completamente para ganar espacio de pantalla cuando necesites más sitio para los paneles.',
        },
        {
          icon: 'bi-image',
          title: 'Iconos visuales personalizados por sitio',
          text: 'Cada sitio en el sidebar y en los paneles muestra su favicon real o un emoji personalizado. Esto te permite identificar visualmente cada herramienta de un vistazo sin necesidad de leer nombres: el icono de TradingView, el de tu broker, el del calendario económico... La combinación de iconos y colores crea un mapa visual de tu estación de trading que puedes navegar de forma intuitiva.',
        },
        {
          icon: 'bi-person-circle',
          title: 'Perfil de usuario editable',
          text: 'Desde la sección Perfil de Ajustes, puedes personalizar tu nombre visible (que aparece en la interfaz) y tu dirección de email de contacto. Los cambios se guardan automáticamente y se sincronizan con el servidor. Tu nombre de usuario de login se mantiene como identificador interno, pero el nombre visible es el que tú elijas.',
        },
        {
          icon: 'bi-keyboard',
          title: 'Referencia completa de atajos de teclado',
          text: 'La sección Atajos de Ajustes muestra una referencia completa de todos los atajos de teclado disponibles: Ctrl+Shift+X para abrir/cerrar Risk Shield, Ctrl+Shift+C para abrir/cerrar la Checklist, Escape para cerrar modales y cancelar el modo de movimiento de panels. Estos atajos funcionan globalmente desde cualquier vista de la aplicación.',
        },
        {
          icon: 'bi-sliders2',
          title: 'Panel de ajustes completo con secciones',
          text: 'El panel de Ajustes centraliza toda la configuración de Clarity en un solo lugar con pestañas de navegación: Perfil (nombre y email), General (preferencias base), Trading (Full Trading Mode, horario, duración), Checklist (editor completo inline de checklists), Apariencia (tema oscuro/claro), Atajos (referencia de teclado) y Solicitar Sitio (enviar peticiones de acceso y ver el estado de las existentes). Cada sección guarda los cambios automáticamente al modificarlos.',
        },
      ],
    },
  ];

  toggleFeature(feature: Feature): void {
    feature.expanded = !feature.expanded;
  }
}
