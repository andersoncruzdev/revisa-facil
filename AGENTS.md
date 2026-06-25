# revisa-facil

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` (runs `tsc -b && vite build`) |
| Lint | `npm run lint` |
| Test (watch) | `npm test` |
| Test (single) | `npm run test:run` |
| Test (coverage) | `npm run test:coverage` |

No formatter (Prettier), no CI, no pre-commit hooks configured.

## Path aliases (tsconfig + vite)

`@app`, `@assets`, `@data`, `@features`, `@hooks`, `@pages`, `@shared`, `@test`, `@types-app`, `@utils` — all map to `./src/<name>` except `@test` → `./test`.

## Architecture

```
pages/ → hooks/ (React Query) → data/ (sync CRUD) → localStorage
```

All data is synchronous localStorage ops wrapped in async `queryFn`/`mutationFn`. React Query invalidates on mutation success via `queryKeys.study.*`.

Route definitions use `createElement` (not JSX) in `src/route.ts`.

## Testing

- Vitest with `globals: true` — no imports needed for `describe`/`it`/`expect`/`vi`.
- `test/setup.ts` loads `@testing-library/jest-dom/vitest` (custom matchers like `toBeInTheDocument`) + auto `cleanup()`.
- Test dir mirrors `src/` structure under `test/`.
- Mock helpers: `test/helpers/mocks.ts` (`useMocks`, `useRenderHooks`), `test/react-query-tests.tsx` (`createQueryClient`, `createWrapper`).
- Hook tests mock `@data/classroom` / `@data/content` at module level, wrap in `QueryClientProvider`.

## Components

`Button` and `Card` use **compound-component pattern** with named exports:
```ts
export const Button = { Root, Icon, Text }
export const Card = { Root, Header, Title, Details, Footer, Actions }
```

## Dates

BR format `dd/mm/yyyy` used throughout. Date utilities in `src/utils/transform-date.ts`.

## Gotchas

- `src/data/data.json` has a different schema (nested `classrooms[].contents[]`) than runtime types — likely legacy/migration artifact.
- `src/services/` alias is defined but the directory does not exist.
- `src/hooks/useHeader.tsx` has `"use client"` directive — leftover from Next.js, unnecessary here.
- Placeholder pages: `/` and `/classrooms`. Nav links `/conteudos`, `/revisoes`, `/historico` have no routes yet.
