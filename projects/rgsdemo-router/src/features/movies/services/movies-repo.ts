import MOVIES_RAW from "../data/movies.json";
import type { MovieProps } from "../types/movie";

const MOVIES = MOVIES_RAW as MovieProps[];

// CRUD -> READ
const getMovies = () => {
  const movies: MovieProps[] = MOVIES;
  return movies;
};

const getMoviesById = (id: string) => {
  const movies: MovieProps[] = MOVIES;
  return movies.find((movie) => movie.id === id);
};

export const moviesRepo = {
  getMovies,
  getMoviesById,
};
