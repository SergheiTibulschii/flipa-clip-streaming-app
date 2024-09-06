# FlipClip Web

## Technologies

- React + TypeScript - frontend library
- Tailwind CSS + SCSS - styling
- Vite JS - build tool
- Jotai - state management
- Axios + SWR - data fetching
- React Router - routing
- Pnpm - package manager
- Supabase - database service used for views and likes

## Scripts

- `pnpm dev` - start development server
- `pnpm build` - build the project
- `pnpm lint` - lint the project
- `pnpm preview` - preview the build
- `pnpm supabase:types` - generate types for Supabase

## Folder Structure

- `src` - source code
  - `components` - reusable components
    - `pages` - page components
    - `ui` - Small reusable components
    - `elements` - More complex components
    - `layout` - layout components
    - `icons.ts` - icon components
  - `api` - api configuration
    - `axios` - axios configuration
    - `swr` - generic swr hook
    - `index.ts` - exports a generic api interface which makes it easy to replace axios with something else
  - `assets` - static assets
  - `context` - react contexts
  - `lib` - folder containing utility functions, common types, hooks, etc.
  - `styles` - global styles

