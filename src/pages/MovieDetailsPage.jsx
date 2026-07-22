import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import CastTags from "../components/CastTags";
import LoadingSpinner from "../components/LoadingSpinner";
import CrewList from "../components/CrewList";
import SimilarMovies from "../components/SimilarMovies";
import useMovieDetails from "../hooks/useMovieDetails";
import { formatRating, formatYear, formatRuntime } from "../utils/format";
import { posterUrl } from "../utils/images";

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { movie, loading, error, reload } = useMovieDetails();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  const poster = movie ? posterUrl(movie.poster_path) : null;
  const ratingLabel = movie ? formatRating(movie.vote_average) : null;
  const year = movie ? formatYear(movie.release_date) : null;
  const runtimeLabel = movie ? formatRuntime(movie.runtime) : null;
  const genres = movie?.genres?.map((g) => g.name).filter(Boolean) || [];
  const cast = movie?.credits?.cast || [];
  const crew = movie?.credits?.crew || [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-800 from-25% via-neutral-900 via-65% to-neutral-900 px-4 py-page-y sm:px-8 sm:py-page-y-lg">
      <div className="mx-auto w-full max-w-details">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Voltar"
          className="mb-6 inline-flex items-center text-brand"
        >
          <IoIosArrowRoundBack size={40} aria-hidden="true" />
        </button>

        {loading ? <LoadingSpinner /> : null}

        {!loading && error === "Token da API não configurado" ? (
          <p className="font-sans text-neutral-200">
            Configure VITE_TMDB_API_TOKEN no arquivo .env (veja .env.example).
          </p>
        ) : null}

        {!loading && error === "Filme não encontrado" ? (
          <div className="flex flex-col gap-3">
            <p className="font-sans text-neutral-200">Filme não encontrado.</p>
            <Link to="/" className="font-sans text-brand underline">
              Voltar para a Home
            </Link>
          </div>
        ) : null}

        {!loading && error && error !== "Token da API não configurado" && error !== "Filme não encontrado" ? (
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

        {!loading && !error && movie ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:items-start">
              <aside>
                {poster ? (
                  <img
                    src={poster}
                    alt={movie.title || "Poster"}
                    className="aspect-poster w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex aspect-poster w-full items-center justify-center rounded-xl bg-neutral-900 p-4 text-sm text-neutral-400">
                    Sem poster
                  </div>
                )}
                <div className="mt-4">
                  <CrewList crew={crew} />
                </div>
              </aside>

              <div className="font-sans text-neutral-100">
                <h1 className="font-impact text-3xl uppercase text-white md:text-4xl">
                  {movie.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white">
                  {ratingLabel ? (
                    <span className="inline-flex items-center gap-1.5">
                      <FaStar className="text-brand" aria-hidden="true" />
                      <span>{ratingLabel}</span>
                    </span>
                  ) : null}
                  {ratingLabel && year ? <span>|</span> : null}
                  {year ? <span>{year}</span> : null}
                  {(ratingLabel || year) && runtimeLabel ? <span>|</span> : null}
                  {runtimeLabel ? <span>{runtimeLabel}</span> : null}
                </div>

                {genres.length > 0 ? (
                  <p className="mt-2 text-sm text-neutral-300">
                    {genres.join(" \u00b7 ")}
                  </p>
                ) : null}

                {movie.overview ? (
                  <p className="mt-4 text-base leading-relaxed text-neutral-200">
                    {movie.overview}
                  </p>
                ) : (
                  <p className="mt-4 text-base italic text-neutral-400">
                    Não possui sinopse.
                  </p>
                )}

                {cast.length > 0 ? (
                  <section className="mt-8">
                    <h2 className="mb-4 font-impact text-2xl uppercase text-white">ELENCO</h2>
                    <CastTags cast={cast} />
                  </section>
                ) : null}
              </div>
            </div>

            <hr className="my-10 border-neutral-700" />
            <SimilarMovies similar={movie.similar} />
          </>
        ) : null}
      </div>
    </main>
  );
}

