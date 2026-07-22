import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatRating, formatYear } from "../utils/format.js";
import { posterUrl } from "../utils/images";

export default function MovieCard({ id, title, posterPath, rating, releaseDate, genres = [] }) {
  const src = posterUrl(posterPath);
  const ratingLabel = formatRating(rating);
  const year = formatYear(releaseDate);
  const genreLabel = Array.isArray(genres) ? genres.filter(Boolean).join(" \u00b7 ") : "";
  const alt = title ? "Poster de " + title : "Poster do filme";

  return (
    <article className="group w-full overflow-hidden rounded-xl bg-neutral-900 shadow-card">
      <Link to={"/movie/" + id} className="block">
        <div className="relative aspect-poster">
          {src ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-75"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-3 text-center text-sm text-neutral-400">
              Sem poster
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-poster-overlay px-4 pb-4 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="font-inter text-sm font-semibold leading-tight text-white line-clamp-2">
              {title}
            </h3>

            <div className="mt-1.5 flex items-center gap-2 font-sans text-sm text-white">
              {ratingLabel ? (
                <span className="inline-flex items-center gap-1.5">
                  <FaStar size={14} aria-hidden="true" className="text-brand" />
                  <span>{ratingLabel}</span>
                </span>
              ) : null}
              {ratingLabel && year ? <span>|</span> : null}
              {year ? <span>{year}</span> : null}
            </div>

            {genreLabel ? (
              <p className="mt-1.5 font-sans text-sm text-white opacity-soft line-clamp-1">
                {genreLabel}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}