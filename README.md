# Clarity — Landing Page

> Landing page premium para **Clarity**, el navegador de trading de escritorio enfocado en productividad.

---

## Objetivo

Crear una landing page **nivel producto real** que:

- Comunique el valor de Clarity como herramienta de trading profesional
- Presente las funcionalidades actuales y el roadmap futuro de forma atractiva e interactiva
- Genere confianza y deseo en los potenciales usuarios
- Sea una pieza diferencial del proyecto gracias al **roadmap interactivo**

---

## Stack Técnico

| Capa             | Tecnología                                           |
| ---------------- | ---------------------------------------------------- |
| Framework        | Angular 21 (standalone components, nuevo control flow) |
| Estilos          | SCSS + CSS custom properties (misma paleta que Clarity) |
| Iconos           | Bootstrap Icons                                      |
| Animaciones      | CSS animations + Angular `@angular/animations`       |
| Roadmap visual   | SVG interactivo + Angular animations                  |
| Testing          | Vitest 4 + @analogjs/vitest-angular + jsdom           |
| Build            | Angular CLI / `@angular/build`                       |

### Decisiones técnicas

- **Sin librerías externas de grafos/roadmap** — El roadmap se construye con SVG nativo + CSS + Angular animations para máximo control visual y mínima dependencia.
- **Misma paleta de colores** — Reutilizamos los CSS custom properties de Clarity (Slate + Blue accent) evolucionándolos con gradientes y efectos glassmorphism para la landing.
- **Standalone components** — Todo modular y lazy-loadable.
- **Responsive** — Mobile-first con breakpoints para tablet y desktop.
- **Vitest** — Mismo framework de testing que el proyecto principal.

---

## Estructura de Secciones

```
┌─────────────────────────────────────────────┐
│  Navbar (sticky, blur backdrop)             │
├─────────────────────────────────────────────┤
│  Hero Section                               │
│  - Headline + tagline                       │
│  - CTA buttons (Descargar / Roadmap)        │
│  - Visual hero (gradient orb animation)     │
├─────────────────────────────────────────────┤
│  Features Section                           │
│  - Grid 3x2 de features principales        │
│  - Iconos + descripción + hover effects     │
│  - Scroll-triggered reveal animations       │
├─────────────────────────────────────────────┤
│  ★ Interactive Roadmap Section ★            │
│  - Tabs: "Implementado" / "Por implementar" │
│  - Nodos por categoría (graph layout)       │
│  - Expand/detail on click                   │  
│  - Conexiones SVG entre nodos               │
│  - Animaciones de entrada progresiva        │
├─────────────────────────────────────────────┤
│  CTA Section                                │
│  - Call to action final                     │
│  - Gradient background                      │
├─────────────────────────────────────────────┤
│  Footer                                     │
│  - Links, copyright                         │
└─────────────────────────────────────────────┘
```

---

## Roadmap Interactivo — Diseño Detallado

### Concepto

El roadmap es un **mapa explorable** donde el usuario descubre las funcionalidades del producto mediante interacción directa.

### Estados principales

| Estado              | Color badge  | Descripción                        |
| ------------------- | ------------ | ---------------------------------- |
| **Implementado**    | `--success`  | Funcionalidades ya disponibles     |
| **Por implementar** | `--accent`   | Funcionalidades en el roadmap      |

### Categorías de features

| Categoría      | Icono               | Features incluidas                          |
| -------------- | ------------------- | ------------------------------------------- |
| Trading        | `bi-graph-up-arrow` | Full Trading Mode, Risk Management, etc.    |
| UI/UX          | `bi-palette`        | Workspaces, Dark/Light Theme, etc.          |
| Seguridad      | `bi-shield-lock`    | Whitelist, JWT Auth, Admin Panel, etc.      |
| Productividad  | `bi-lightning`      | Checklists, Site Requests, Shortcuts, etc.  |
| Próximamente   | `bi-rocket`         | Multi-monitor, AI Insights, Plugins, etc.   |

### Comportamiento interactivo

1. **Tab switching** — Al hacer clic en "Implementado" o "Por implementar", se filtran los nodos con una transición animada.
2. **Category grouping** — Los nodos se agrupan visualmente por categoría con líneas SVG de conexión.
3. **Hover effects** — Los nodos brillan (glow) al pasar el cursor, las conexiones se iluminan.
4. **Click to expand** — Al hacer clic en un nodo, se despliega un panel con detalles expandidos (qué hace, por qué es útil).
5. **Entrada progresiva** — Los nodos aparecen secuencialmente con stagger animation al cambiar de tab o al scroll inicial.
6. **Responsive** — En mobile, layout en lista; en desktop, layout de grafo.

---

## Integración con el Proyecto

- ClarityLP es un repositorio independiente que referencia la misma paleta de diseño que Clarity.
- Los datos del roadmap (features implementadas y por implementar) están definidos como datos estáticos en el propio componente, fácilmente actualizables.
- La landing puede desplegarse como sitio estático (Angular SSG / pre-render).

---

## Estructura de Archivos

```
src/
├── index.html
├── main.ts
├── styles.scss                    # Design system (CSS custom properties)
├── test-setup.ts                  # Test mocks
├── app/
│   ├── app.ts                     # Root component (scrollable page)
│   ├── app.html
│   ├── app.scss
│   ├── app.config.ts
│   ├── data/
│   │   └── roadmap.data.ts        # Feature definitions (implementadas + futuras)
│   └── components/
│       ├── navbar/
│       │   ├── navbar.ts
│       │   ├── navbar.html
│       │   └── navbar.scss
│       ├── hero/
│       │   ├── hero.ts
│       │   ├── hero.html
│       │   └── hero.scss
│       ├── features/
│       │   ├── features.ts
│       │   ├── features.html
│       │   └── features.scss
│       ├── roadmap/
│       │   ├── roadmap.ts
│       │   ├── roadmap.html
│       │   ├── roadmap.scss
│       │   └── roadmap-node/
│       │       ├── roadmap-node.ts
│       │       ├── roadmap-node.html
│       │       └── roadmap-node.scss
│       ├── cta/
│       │   ├── cta.ts
│       │   ├── cta.html
│       │   └── cta.scss
│       └── footer/
│           ├── footer.ts
│           ├── footer.html
│           └── footer.scss
```

---

## Scripts

```bash
npm start          # Servidor de desarrollo (ng serve → localhost:4200)
npm run build      # Build de producción
npm test           # Ejecutar tests (ng test → vitest via @angular/build:unit-test)
npm run test:watch # Tests en modo watch
```

---

## Cómo ejecutar

```bash
cd ClarityLP
npm install
npm start
# → http://localhost:4200
```

---

## Cómo modificar/extender

### Añadir una feature al roadmap

Edita `src/app/data/roadmap.data.ts`:

```typescript
{
  id: 'new-feature',
  title: 'New Feature Name',
  description: 'Brief description of what it does.',
  detail: 'Extended explanation of why it is useful.',
  category: 'trading',       // trading | ui | security | productivity | upcoming
  status: 'implemented',     // 'implemented' | 'planned'
  icon: 'bi-icon-name'
}
```

### Añadir una nueva sección a la landing

1. Crea un nuevo componente en `src/app/components/`
2. Impórtalo en `app.ts`
3. Añádelo al template `app.html`

---

## Tests

64 tests across 8 test suites cubriendo:

- **App root** — Renderizado de todas las secciones principales
- **Navbar** — Logo, enlaces, menú mobile, scroll state
- **Hero** — Headline, CTAs, stats, mockup visual
- **Features** — Grid de cards, iconos, títulos, descripciones
- **Roadmap** — Tabs (implementado/planned), filtrado por categoría, expansión, conteos, indicador de tab, rendering de nodos
- **Roadmap Node** — Título, descripción, badge de estado, expand/collapse, eventos click/keyboard, ARIA attrs, clases CSS
- **CTA** — Título, botones
- **Footer** — Logo, año, links
