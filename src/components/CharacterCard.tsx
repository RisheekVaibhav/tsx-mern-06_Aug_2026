import type { Character } from "../types/character";
import { getSpeciesColor } from "../utils/speciesColor";

interface CharacterCardProps {
  character: Character;
  imageUrl: string;
  onClick: () => void;
}

export function CharacterCard({ character, imageUrl, onClick }: CharacterCardProps) {
  const colorClasses = getSpeciesColor(character.species);

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
        src={imageUrl}
        alt={character.name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800">{character.name}</h2>
      <p className="text-sm text-gray-600">{character.gender}</p>
    </div>
  );
}
