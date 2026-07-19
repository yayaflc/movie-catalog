export function formatRating(rating) {
  if (rating == null || Number.isNaN(Number(rating))) return null;
  return Number(rating).toFixed(1);
}

export function formatYear(releaseDate) {
  if (!releaseDate || typeof releaseDate !== "string" || releaseDate.length < 4) return null;
  const year = releaseDate.slice(0, 4);
  const n = Number(year);
  if (!Number.isFinite(n) || n < 1880) return null;
  return year;
}

export function formatRuntime(minutes) {
  if (minutes == null || !Number.isFinite(Number(minutes))) return null;
  const m = Number(minutes);
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h <= 0) return rest + "m";
  return h + "h " + rest + "m";
}
