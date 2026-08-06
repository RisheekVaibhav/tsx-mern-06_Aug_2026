import { useState, useEffect } from "react";
import { getPlanet } from "../services/swapi";
import type { Planet } from "../types/character";

export function usePlanet(planetUrl: string | null) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planetUrl) {
      setPlanet(null);
      return;
    }

    let isCancelled = false;

    async function fetchPlanet() {
      setIsLoading(true);
      setError(null);

      try {
        if (!planetUrl) return;
        const data = await getPlanet(planetUrl);
        if (!isCancelled) {
          setPlanet(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to load homeworld details.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPlanet();

    return () => {
      isCancelled = true;
    };
  }, [planetUrl]);

  return { planet, isLoading, error };
}
