<h1 align="center">frameteca 📽</h1>

<p align="center"><i>feito com React, integrado com a API The Movie Database (TMDB).</i></p>

<br>

### Pré-requisitos

- Node.js 18 ou superior

### Token da API TMDB

1. Crie conta no [portal de desenvolvedores do TMDB](https://developer.themoviedb.org/docs/getting-started).
2. Em Settings > API, copie o API Read Access Token (Bearer).

### Configuração

1. Copie `.env.example` para `.env`:
2. Defina `VITE_TMDB_API_TOKEN` no arquivo `.env`.
3. Opcional: `VITE_TMDB_LANGUAGE` (padrão `pt-BR`).

### Instalação

```bash
npm install
npm run dev
```

### Rotas

- `/` — Home (catálogo de filmes)
- `/movie/:id` — Detalhes do filme

<br>
<p align="center"><a href="https://movie-catalog-frameteca.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Deploy na Vercel"></a></p>
