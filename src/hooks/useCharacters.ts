import { useState, useEffect } from "react";
import { getCharacters } from "../services/swapi";
import type { Character } from "../types/character";

export function useCharacters(page: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCharacters(page);
        if (!isCancelled) {
          setCharacters(data.results);
          setTotalCount(data.count);
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
  }, [page]);

  return { characters, isLoading, error, totalCount };
}
