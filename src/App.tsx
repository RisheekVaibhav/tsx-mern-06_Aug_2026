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
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Star Wars Characters
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={speciesFilter}
          onChange={(e) => handleSpeciesFilterChange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All species</option>
          {availableSpeciesIds.map((id) => (
            <option key={id} value={id}>
              {id === "none" ? "Unspecified species" : `Species #${id}`}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <p className="text-gray-500 text-lg">Loading characters...</p>
      )}

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
          {error}
        </p>
      )}

      {!isLoading && !error && characters.length === 0 && (
        <p className="text-gray-500">No characters match your search.</p>
      )}

      {!isLoading && !error && characters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

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
