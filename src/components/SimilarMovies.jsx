import MovieCard from "./MovieCard";

export default function SimilarMovies({ similar }) {
  const items = (similar?.results || []).slice(0, 8);

  return (
    <section className="w-full">
      <h2 className="mb-4 font-impact text-2xl uppercase tracking-wide text-white md:text-3xl">
        FILMES SIMILARES
      </h2>
      {items.length === 0 ? (
        <p className="mt-4 text-base italic text-neutral-400">
          Não possui filmes similares.
        </p>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      )}
    </section>
  );
}

