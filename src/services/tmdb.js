const BASE_URL = "https://api.themoviedb.org/3";

function getToken() {
  return import.meta.env.VITE_TMDB_API_TOKEN;
}

async function fetchTmdb(path, params = {}) {
  const token = getToken();
  if (!token) {
    throw new Error("Token da API não configurado");
  }

  const url = new URL(BASE_URL + path);
  url.searchParams.set("language", import.meta.env.VITE_TMDB_LANGUAGE || "pt-BR");

  for (const key in params) {
    if (params[key] != null) {
      url.searchParams.set(key, String(params[key]));
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Filme não encontrado");
    }
    throw new Error("Erro ao buscar dados da API");
  }

  return response.json();
}

export function getMovies({ sort = "popular", page = 1 } = {}) {
  if (sort === "top_rated") {
    return fetchTmdb("/movie/top_rated", { page });
  }
  if (sort === "az") {
    return fetchTmdb("/discover/movie", { page, sort_by: "original_title.asc" });
  }
  return fetchTmdb("/movie/popular", { page });
}

export function searchMovies({ query, page = 1 } = {}) {
  return fetchTmdb("/search/movie", { query, page });
}

let genres = null;

export async function getGenres() {
  if (genres) return genres;

  const data = await fetchTmdb("/genre/movie/list");
  genres = {};

  for (const genre of data.genres || []) {
    genres[genre.id] = genre.name;
  }

  return genres;
}

export function getMovieDetails(id) {
  return fetchTmdb("/movie/" + id, {
    append_to_response: "credits,similar",
  });
}
