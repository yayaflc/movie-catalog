import { useEffect, useState } from "react";
import { getMovies, getGenres, searchMovies } from "../services/tmdb";

export default function useMovieList({ sort, page, query = "" }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadMovies() {
    setLoading(true);
    setError(null);

    try {
      const searchText = query.trim();
      const genres = await getGenres();

      const data = searchText
        ? await searchMovies({ query: searchText, page })
        : await getMovies({ sort, page });

      const list = (data.results || []).map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
        genres: (movie.genre_ids || [])
          .map((id) => genres[id])
          .filter(Boolean),
      }));

      setMovies(list);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message || "Erro ao carregar filmes");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, [sort, page, query]);

  return { movies, totalPages, loading, error, reload: loadMovies };
}
