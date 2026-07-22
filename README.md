# Catálogo de Filmes (TMDB)

Aplicação React que consome a API The Movie Database (TMDB).

## Pré-requisitos

- Node.js 18 ou superior

## Token da API TMDB

1. Crie conta no portal de desenvolvedores do TMDB.
2. Em Settings > API, copie o API Read Access Token (Bearer).

## Configuração

1. Copie .env.example para .env
2. Defina VITE_TMDB_API_TOKEN
3. Opcional: VITE_TMDB_LANGUAGE (padrão pt-BR)

## Instalação

npm install
npm run dev
npm run build

## Rotas

- `/` — Home (catálogo de filmes)
- `/movie/:id` — Detalhes do filme
