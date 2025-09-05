# Online Guitar Shop

A 3-page guitar shop application built as part of a Software Engineering Intern assignment. The app allows users to explore guitar brands, browse guitar models, and view detailed specifications — all powered by a GraphQL API and styled for a clean, modern experience.

## Features

### Page 1 – Guitar Brands

- Displays all guitar brands from the API
- Clicking a brand navigates to its models page

### Page 2 – Guitar Models

- Shows guitar models for the selected brand
- Includes search bar to filter models by name
- Filter dropdown to narrow by guitar type
- Pagination to navigate large sets of models
- Clicking a model navigates to the details page

### Page 3 – Guitar Details (Bonus)

- Two-tab layout for specifications and musicians
- Specifications tab shows full guitar specs
- Musicians tab lists musicians using the guitar (2 at a time, with "load more")

## Bonus Features

- Language switcher (English + Macedonian/Albanian)
- Infinite scroll (alternative to pagination)
- Responsive design with modern UI

## Tech Stack

- Frontend: React 18 + TypeScript + Vite
- Styling: TailwindCSS + PostCSS
- Data Layer: Apollo Client + GraphQL
- Routing: React Router DOM
- Build Tools: Vite + ESLint + TypeScript
- Package Manager: pnpm

## API

Data is fetched from the following GraphQL endpoint:

```
https://graphql-api-brown.vercel.app/api/graphql
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page-level components (Brands, Models, Details)
├── graphql/        # Apollo GraphQL queries
├── hooks/          # Custom React hooks
├── lib/            # Utilities and configurations
│   ├── apollo.ts   # Apollo Client setup
│   ├── language.tsx # Multi-language context
│   ├── utils.ts    # Helper functions
│   └── translations/ # Language files
├── types/          # TypeScript type definitions
└── App.tsx         # Application root
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd online-guitar-shop

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be running at http://localhost:5173

### Build for Production

```bash
pnpm build
```

## Design Reference

The UI was implemented based on a provided Figma design.

## Requirements Covered

- Apollo Client for GraphQL queries & mutations
- Graceful handling of loading and error states
- Responsive design with TailwindCSS
- Routing between pages with React Router DOM
- Bonus: Language switcher + infinite scroll
- Bonus: Guitar Details page with specs + musicians tabs

## License

MIT © 2025
