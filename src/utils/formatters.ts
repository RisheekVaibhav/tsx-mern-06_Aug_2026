export function formatDateAdded(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatMeasurement(value: string, unit: string): string {
  if (value === "unknown" || value === "n/a") {
    return "Unknown";
  }
  return `${value}${unit}`;
}

export function formatHeightInMeters(heightCm: string): string {
  if (heightCm === "unknown" || heightCm === "n/a") {
    return "Unknown";
  }
  const meters = parseInt(heightCm, 10) / 100;
  return `${meters.toFixed(2)}m`;
}
