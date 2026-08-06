import type { Character, PeopleApiResponse, Planet } from "../types/character";

const BASE_URL = "https://swapi.info/api";

const PAGE_SIZE = 10;

export async function getAllCharacters(): Promise<Character[]> {
  const response = await fetch(`${BASE_URL}/people`);

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`);
  }

  const data: Character[] = await response.json();
  return data;
}

export async function getCharacters(page: number = 1): Promise<PeopleApiResponse> {
  const allCharacters = await getAllCharacters();

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageResults = allCharacters.slice(startIndex, endIndex);

  return {
    count: allCharacters.length,
    next: endIndex < allCharacters.length ? "has-more" : null,
    previous: startIndex > 0 ? "has-previous" : null,
    results: pageResults,
  };
}

export async function getPlanet(planetUrl: string): Promise<Planet> {
  const response = await fetch(planetUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch planet: ${response.status}`);
  }

  const data: Planet = await response.json();
  return data;
}
