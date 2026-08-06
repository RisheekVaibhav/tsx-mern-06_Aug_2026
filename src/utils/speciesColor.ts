const SPECIES_COLORS = [
  "bg-emerald-100 border-emerald-400",
  "bg-sky-100 border-sky-400",
  "bg-amber-100 border-amber-400",
  "bg-rose-100 border-rose-400",
  "bg-violet-100 border-violet-400",
  "bg-teal-100 border-teal-400",
  "bg-orange-100 border-orange-400",
  "bg-fuchsia-100 border-fuchsia-400",
];

const UNKNOWN_SPECIES_COLOR = "bg-slate-100 border-slate-400";

function getSpeciesId(speciesUrl: string): number {
  const match = speciesUrl.match(/\/species\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getSpeciesColor(species: string[]): string {
  if (species.length === 0) {
    return UNKNOWN_SPECIES_COLOR;
  }

  const speciesId = getSpeciesId(species[0]);
  const colorIndex = speciesId % SPECIES_COLORS.length;
  return SPECIES_COLORS[colorIndex];
}
