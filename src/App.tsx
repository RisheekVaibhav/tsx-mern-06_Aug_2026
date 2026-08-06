import { useState } from "react";
import { useCharacterSearch } from "./hooks/useCharacterSearch";
import { CharacterCard } from "./components/CharacterCard";
import { CharacterModal } from "./components/CharacterModal";
import type { Character } from "./types/character";

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [imageSeedSalt] = useState(() => Math.random().toString(36).slice(2));

  const {
    characters,
    isLoading,
    error,
    totalCount,
    totalPages,
    availableSpeciesIds,
  } = useCharacterSearch(page, searchTerm, speciesFilter);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleSpeciesFilterChange(value: string) {
    setSpeciesFilter(value);
    setPage(1);
  }

  function getImageUrlForCharacter(character: Character): string {
    const imageSeed = `${imageSeedSalt}-${character.url}`;
    return `https://picsum.photos/400/300?random=${encodeURIComponent(imageSeed)}`;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_26%)]" />

      <main className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="mb-8 rounded-2xl bg-slate-900/40 px-5 py-6 sm:px-8 sm:py-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-amber-200/70">
            Star Wars Character Explorer
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Star Wars Characters
          </h1>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/30"
            />
            <select
              value={speciesFilter}
              onChange={(e) => handleSpeciesFilterChange(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-200/30 sm:min-w-64"
            >
              <option value="all">All species</option>
              {availableSpeciesIds.map((id) => (
                <option key={id} value={id}>
                  {id === "none" ? "Unspecified species" : `Species #${id}`}
                </option>
              ))}
            </select>
          </div>
        </section>

        {isLoading && (
          <p className="text-lg text-slate-200">Loading characters...</p>
        )}

        {error && (
          <p className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-100">
            {error}
          </p>
        )}

        {!isLoading && !error && characters.length === 0 && (
          <p className="text-slate-300">No characters match your search.</p>
        )}

        {!isLoading && !error && characters.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard
                key={character.url}
                character={character}
                imageUrl={getImageUrlForCharacter(character)}
                onClick={() => setSelectedCharacter(character)}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && totalCount > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full border border-white/10 bg-white/95 px-5 py-2 font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-slate-300 sm:text-base">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-full border border-white/10 bg-white/95 px-5 py-2 font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
}

export default App;
