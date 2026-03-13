# NCMP Uganda – AI Development Rules

## Tech Stack
- **Framework**: React 18 with Vite (TypeScript)
- **Styling**: Tailwind CSS (Utility-first, HSL colors only)
- **UI Components**: Shadcn/UI (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: Framer Motion (for all transitions and micro-interactions)
- **State Management**: TanStack Query (Server state) & React Context (UI state)
- **Routing**: React Router Dom v6
- **Real-time**: Socket.io-client & Firebase Messaging (FCM)
- **Backend Integration**: REST API with Bearer Token Auth

## Library Usage Rules
- **Shadcn/UI**: Always use existing components in `src/components/ui/`. Do not recreate buttons, inputs, or dialogs.
- **Framer Motion**: Use for all page transitions and hover effects to maintain a premium "National Infrastructure" feel.
- **Lucide React**: Use for all iconography. Keep stroke width at 2px for consistency.
- **Tailwind**: Use the custom NCMP theme colors (`gold`, `uganda-red`, `uganda-black`). Avoid hardcoded hex codes.
- **Data Handling**: All national data must flow through `src/data/ugandaData.ts` to ensure a single source of truth for the 2026 registry.

## Architecture Rules
- **Components**: Keep under 100 lines. Extract sub-components immediately.
- **Pages**: Located in `src/pages/`.
- **Services**: API and Socket logic must stay in `src/services/`.
- **Access Control**: Always check `localStorage.getItem('role')` before rendering sensitive communication actions.