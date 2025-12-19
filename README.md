# QuabtigoAI Frontend

This repository contains the frontend for a weather application built with Next.js (App Router) and TypeScript. It provides current weather, hourly and daily forecasts, a searchable city input, theming, and a small set of UI components for display and interaction.

**Technologies & Libraries Used**

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS + PostCSS (project uses Tailwind v4 tooling)
- **Component Primitives**: Radix UI
- **Icons**: lucide-react
- **Forms & Validation**: react-hook-form + zod + @hookform/resolvers
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Theme**: next-themes
- **Notifications**: sonner
- **Carousel**: embla-carousel-react
- **Utilities**: clsx, class-variance-authority, tailwind-merge
- **Linting/Dev**: TypeScript, ESLint (Next's lint script)

Note: See `package.json` for full dependency versions.

**What this project contains**

- `app/` - Next.js App Router pages and layouts.
- `components/` - Reusable React components (weather widgets, header, search, UI primitives).
- `lib/` - Helpers and API wrapper(s) for fetching weather data.
- `public/` - Static assets.
- `styles/global` - global CSS (see `app/globals.css`).

**Important: API key handling**
The project includes a small API wrapper at `lib/weather-api.ts` that calls OpenWeatherMap. Currently an API key is hard-coded in that file. For production and safety, replace the hard-coded key with an environment variable and update the fetches to read from `process.env.OPENWEATHER_API_KEY` (or a similarly named variable) and ensure you do not commit the real key to the repository.

Suggested change example (server-side / Next.js edge-safe):

```ts
const API_KEY = process.env.OPENWEATHER_API_KEY || "";
```

Be sure to add the variable to your deployment platform (e.g., Vercel) or a local `.env.local` file.

**Local development (quickstart)**
Prerequisites: Node.js 18+ and npm (or pnpm/yarn).

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Linting:

```bash
npm run lint
```

**Project structure (high level)**

- `app/layout.tsx` - Root layout and global providers
- `app/page.tsx` - Main entry page
- `components/current-weather.tsx` - Current conditions display
- `components/hourly-forecast.tsx` - Hourly forecast component
- `components/daily-forecast.tsx` - Daily forecast component
- `components/weather-search.tsx` - City search and autocomplete
- `components/theme-provider.tsx` - Theme support (dark/light)
- `lib/weather-api.ts` - OpenWeatherMap API helpers
- `lib/weather-utils.ts` - Formatting and helper functions

**Development notes & recommendations**

- Replace the hard-coded OpenWeatherMap API key with environment variables.
- Consider adding a basic test setup (Jest/Testing Library) for components.
- For deployment, Vercel is well-suited for Next.js App Router projects.

**Contributing**

- Fork the repo, create a feature branch, open a pull request.

**License**
This project currently has no license file. Add a license if you plan to share or open-source the code.

---

If you'd like, I can:

- convert `lib/weather-api.ts` to use environment variables and update `.env.example`;
- add a short CONTRIBUTING.md and a LICENSE file;
- or run a quick local dev start to verify everything boots.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
