import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Filter from "../components/Filter";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import useMovieList from "../hooks/useMovieList";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || "top_rated";
  const query = searchParams.get("q") || "";

  const { movies, totalPages, loading, error, reload } = useMovieList({
    sort,
    page,
    query,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, sort, query]);

  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);

    if (changes.sort !== undefined) next.set("sort", changes.sort);
    if (changes.page !== undefined) next.set("page", String(changes.page));
    if (changes.query !== undefined) {
      if (changes.query) next.set("q", changes.query);
      else next.delete("q");
    }

    setSearchParams(next);
  }

  function handleSortChange(newSort) {
    updateParams({ sort: newSort, page: 1 });
  }

  function handleQueryChange(newQuery) {
    updateParams({ query: newQuery, page: 1, sort });
  }

  function handlePageChange(_, value) {
    updateParams({ page: value, sort, query });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-800 from-25% via-neutral-900 via-65% to-neutral-900 px-4 py-page-y sm:px-8 sm:py-page-y-lg">
      <div className="mx-auto flex w-full max-w-catalog flex-col">
        <header className="flex w-full flex-col gap-10 sm:gap-14">
          <div className="flex flex-col gap-2">
            <h1 className="font-oswald text-4xl uppercase tracking-wide sm:text-5xl md:text-6xl">
              <span className="font-bold text-brand">FRAME</span>
              <span className="font-bold text-white">TECA</span>
            </h1>
            <p className="font-sans text-base italic text-neutral-400 sm:text-lg">
              Sua bússola no universo do cinema.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <SearchBar value={query} onChange={handleQueryChange} />
            <Filter value={sort} onChange={handleSortChange} />
          </div>
        </header>

        <div className="mt-6 flex flex-col gap-8 sm:mt-8">
          {loading ? <LoadingSpinner /> : null}

          {!loading && error === "Token da API não configurado" ? (
            <p className="font-sans text-neutral-200">
              Configure VITE_TMDB_API_TOKEN no arquivo .env (veja .env.example).
            </p>
          ) : null}

          {!loading && error && error !== "Token da API não configurado" ? (
            <div className="flex flex-col gap-3">
              <p className="font-sans text-neutral-200">{error}</p>
              <button
                type="button"
                onClick={reload}
                className="w-fit rounded-lg bg-brand px-4 py-2 font-sans text-sm font-semibold text-brand-ink"
              >
                Tentar novamente
              </button>
            </div>
          ) : null}

          {!loading && !error && movies.length === 0 ? (
            <p className="font-sans italic text-neutral-400">Nenhum filme encontrado.</p>
          ) : null}

          {!loading && !error && movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.posterPath}
                    rating={movie.rating}
                    releaseDate={movie.releaseDate}
                    genres={movie.genres}
                  />
                ))}
              </div>

              {totalPages > 1 ? (
                <Stack spacing={2} className="items-center">
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#fff",
                      },
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "var(--color-brand)",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "var(--color-brand)",
                        },
                      },
                    }}
                  />
                </Stack>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
