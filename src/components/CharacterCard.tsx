import type { Character } from "../types/character";
import { getSpeciesColor } from "../utils/speciesColor";
import { useState } from "react";

interface CharacterCardProps {
  character: Character;
  imageUrl: string;
  onClick: () => void;
}

export function CharacterCard({ character, imageUrl, onClick }: CharacterCardProps) {
  const colorClasses = getSpeciesColor(character.species);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>` +
      `<rect width='100%' height='100%' fill='#0f172a'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e2e8f0' font-size='24' font-family='Arial, sans-serif'>${character.name}</text>` +
      `</svg>`
  )}`;

  return (
    <div
      onClick={onClick}
      className={`
        ${colorClasses}
        border-2 rounded-xl p-4 cursor-pointer
        shadow-sm
        transition-transform duration-200 ease-out
        hover:scale-105 hover:shadow-lg
      `}
    >
      <img
        src={currentImageUrl}
        alt={character.name}
        onError={() => setCurrentImageUrl(fallbackSvg)}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800">{character.name}</h2>
      <p className="text-sm text-gray-600">{character.gender}</p>
    </div>
  );
}
