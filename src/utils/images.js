const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function posterUrl(path, size = "w500") {
  if (!path) return null;
  return IMAGE_BASE + "/" + size + path;
}
