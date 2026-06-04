# VisualLogic Ultra

Phase 1 foundation for a public Salesforce Agentforce dashboard visualization platform.

Salesforce remains the intelligence and orchestration layer. VisualLogic Ultra is the visualization, customization, presentation, export-shell, and interaction layer only.

## Architecture Priority

1. Hybrid Blueprint: source of truth
2. Gemini Final Architecture: implementation reference

Resolved conflict: layout persistence follows the Hybrid Blueprint. Dashboard layouts are saved locally in `localStorage` and never modify Salesforce data. The `/api/layout/save` route is a mock contract acknowledgment.

## Phase 1 Scope

Implemented:

- Next.js 15 App Router structure
- Public routing architecture
- Global platform layout
- Light, dark, and dashboard theme engine
- Zustand UI stores
- AI Command Center shell
- Live Agent Thinking Timeline mock
- Dashboard Renderer shell
- Dashboard Studio shell
- Presentation Mode shell
- Event Center shell
- Export Center shell
- Navigation system
- Widget framework
- Responsive design tokens
- shadcn/ui-style primitives
- Typed Salesforce Agentforce adapter abstraction
- Mock API contract routes

Not implemented:

- Authentication
- Login
- Registration
- Salesforce API calls
- Real dashboard generation
- Real AI generation
- Backend services
- PDF generation

## Installation

```bash
npm install
```

## Execution

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## API Contract

Mock App Router endpoints:

```text
GET  /api/dashboard/latest
GET  /api/dashboard/{id}
GET  /api/events
POST /api/generate
POST /api/layout/save
```

These routes return typed mock payloads behind `src/lib/salesforce/salesforce-adapter.ts`.

## Project Structure

```text
.
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── src
    ├── app
    │   ├── (platform)
    │   │   ├── dashboard/[id]/page.tsx
    │   │   ├── events/page.tsx
    │   │   ├── export/[id]/page.tsx
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── studio/[id]/page.tsx
    │   ├── api
    │   │   ├── dashboard/[id]/route.ts
    │   │   ├── dashboard/latest/route.ts
    │   │   ├── events/route.ts
    │   │   ├── generate/route.ts
    │   │   └── layout/save/route.ts
    │   ├── presentation/[id]/page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   └── not-found.tsx
    ├── components
    │   ├── layout
    │   │   ├── app-shell.tsx
    │   │   ├── mobile-nav.tsx
    │   │   ├── side-nav.tsx
    │   │   ├── theme-toggle.tsx
    │   │   └── top-bar.tsx
    │   ├── providers
    │   │   ├── app-providers.tsx
    │   │   └── theme-provider.tsx
    │   └── ui
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── separator.tsx
    │       └── skeleton.tsx
    ├── data
    │   ├── mock-agent.ts
    │   ├── mock-dashboards.ts
    │   └── mock-events.ts
    ├── features
    │   ├── command-center/components
    │   │   ├── agent-thinking-timeline.tsx
    │   │   └── command-center-shell.tsx
    │   ├── dashboard/components
    │   │   ├── dashboard-actions.tsx
    │   │   ├── dashboard-grid.tsx
    │   │   ├── dashboard-renderer-shell.tsx
    │   │   ├── widget-frame.tsx
    │   │   ├── widget-renderer.tsx
    │   │   └── widgets
    │   ├── events/components/event-center-shell.tsx
    │   ├── export/components/export-center-shell.tsx
    │   ├── presentation/components/presentation-shell.tsx
    │   └── studio/components/dashboard-studio-shell.tsx
    ├── lib
    │   ├── api
    │   │   ├── api-client.ts
    │   │   └── envelope.ts
    │   ├── salesforce
    │   │   ├── mock-salesforce-client.ts
    │   │   └── salesforce-adapter.ts
    │   ├── storage/layout-storage.ts
    │   ├── navigation.ts
    │   └── utils.ts
    ├── services
    │   ├── agent.service.ts
    │   ├── dashboard.service.ts
    │   ├── events.service.ts
    │   └── layout.service.ts
    ├── stores
    │   ├── command-center-store.ts
    │   ├── dashboard-store.ts
    │   ├── layout-store.ts
    │   └── theme-store.ts
    ├── styles/design-tokens.ts
    └── types
        ├── agent.ts
        ├── api.ts
        ├── dashboard.ts
        ├── events.ts
        ├── index.ts
        ├── layout.ts
        ├── theme.ts
        └── widget.ts
```

## Phase 2 Gate

Stop here until Phase 2 is approved. The next phase should not begin without explicit approval.
