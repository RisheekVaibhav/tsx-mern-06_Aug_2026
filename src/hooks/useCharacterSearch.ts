import { useState, useEffect, useMemo } from "react";
import { getAllCharacters } from "../services/swapi";
import type { Character } from "../types/character";

const PAGE_SIZE = 10;

function getSpeciesId(character: Character): string {
  if (character.species.length === 0) return "none";
  const match = character.species[0].match(/\/species\/(\d+)/);
  return match ? match[1] : "none";
}

export function useCharacterSearch(page: number, searchTerm: string, speciesFilter: string) {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllCharacters();
        if (!isCancelled) {
          setAllCharacters(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to load characters. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  const availableSpeciesIds = useMemo(() => {
    const ids = new Set(allCharacters.map(getSpeciesId));
    return Array.from(ids).sort();
  }, [allCharacters]);

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter((character) => {
      const matchesSearch = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      const matchesSpecies =
        speciesFilter === "all" || getSpeciesId(character) === speciesFilter;

      return matchesSearch && matchesSpecies;
    });
  }, [allCharacters, searchTerm, speciesFilter]);

  const totalCount = filteredCharacters.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return {
    characters: paginatedCharacters,
    isLoading,
    error,
    totalCount,
    totalPages,
    availableSpeciesIds,
  };
}
