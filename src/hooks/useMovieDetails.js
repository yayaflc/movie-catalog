import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";

export default function useMovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadMovie() {
    if (!id) {
      setError("Filme não encontrado");
      setMovie(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar detalhes");
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovie();
  }, [id]);

  return { movie, loading, error, reload: loadMovie };
}
