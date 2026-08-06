# Star Wars Character Explorer

A responsive React + TypeScript app that browses Star Wars characters via a public REST API, with pagination, per-character detail modals, and homeworld lookups.

Built as part of the Frontend Developer (UI/UX) assignment for TechStaX.

## Live Demo

- **Hosted app:** _add your Vercel/Netlify link here_
- **Demo video:** _add your YouTube/GDrive link here_

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool / dev server
- **Tailwind CSS v4** — styling
- Native **Fetch API** for REST calls (no extra HTTP library needed for this scope)

## Features

- Paginated character grid (10 per page)
- Loading and error states for all API calls
- Species-based card coloring, derived from each character's species ID (no extra API calls needed just to color cards)
- Hover animation on cards
- Click a card to open a modal with:
  - Height (converted to meters), mass, birth year, number of films
  - Date added to the API, formatted as `dd-MM-yyyy`
  - Homeworld details (name, terrain, climate, resident count) — fetched on demand when the modal opens
- Fully responsive layout (1 column on mobile, up to 4 on desktop)
- **Search by name** (partial match) combined with a **species filter** — both apply together, and changing either resets pagination back to page 1

## API Note

The assignment references `swapi.dev`, which is a community-run instance that
is currently unreliable/down. This project uses **[swapi.info](https://swapi.info)**
instead — a maintained mirror with an identical character data shape. The base
URL is centralized in `src/services/swapi.ts`, so switching providers again
would only require changing one constant.

One consequence: `swapi.info` returns all characters in a single response
rather than paginating server-side, so pagination is handled client-side
in the same service file.

## Project Structure

```
src/
├── components/     # CharacterCard, CharacterModal
├── hooks/          # useCharacters, usePlanet — data-fetching + state logic
├── services/       # swapi.ts — all API calls live here
├── types/          # TypeScript interfaces for API data shapes
├── utils/          # formatters.ts, speciesColor.ts — small pure helper functions
└── App.tsx         # top-level layout, pagination, modal open/close state
```

## Running Locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Screenshots

_Add screenshots of the character grid and the detail modal here before submitting._

![Character grid](./screenshots/grid.png)
![Character modal](./screenshots/modal.png)
