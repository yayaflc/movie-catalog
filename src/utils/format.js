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

export function formatReleaseDate(releaseDate) {
  if (!releaseDate || typeof releaseDate !== "string" || releaseDate.length < 10) return null;
  const [year, month, day] = releaseDate.split("-").map(Number);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  const parts = date
    .toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    .split(" de ");
  if (parts.length === 3) {
    parts[1] = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    return parts.join(" de ");
  }
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}

export function formatRuntime(minutes) {
  if (minutes == null || !Number.isFinite(Number(minutes))) return null;
  const m = Number(minutes);
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h <= 0) return rest + "m";
  return h + "h " + rest + "m";
}
