import type { Character } from "../types/character";
import { usePlanet } from "../hooks/usePlanet";
import {
  formatDateAdded,
  formatHeightInMeters,
  formatMeasurement,
} from "../utils/formatters";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  const { planet, isLoading, error } = usePlanet(character.homeworld);

  return (
    // The dark overlay behind the modal. Clicking it closes the modal,
    // which is a standard UX pattern users expect.
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      {/* stopPropagation prevents a click inside the modal card from
          bubbling up to the overlay and closing it accidentally. */}
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{character.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Height</dt>
            <dd className="text-gray-900 font-medium">
              {formatHeightInMeters(character.height)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Mass</dt>
            <dd className="text-gray-900 font-medium">
              {formatMeasurement(character.mass, "kg")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Birth Year</dt>
            <dd className="text-gray-900 font-medium">{character.birth_year}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Films Appeared In</dt>
            <dd className="text-gray-900 font-medium">{character.films.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Added to API</dt>
            <dd className="text-gray-900 font-medium">
              {formatDateAdded(character.created)}
            </dd>
          </div>
        </dl>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Homeworld</h3>

          {isLoading && <p className="text-sm text-gray-400">Loading homeworld...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {planet && !isLoading && !error && (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Name</dt>
                <dd className="text-gray-900 font-medium">{planet.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Terrain</dt>
                <dd className="text-gray-900 font-medium">{planet.terrain}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Climate</dt>
                <dd className="text-gray-900 font-medium">{planet.climate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Residents</dt>
                <dd className="text-gray-900 font-medium">
                  {planet.residents.length}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
