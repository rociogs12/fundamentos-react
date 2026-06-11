import type { MovieProps, NewMovieDTO } from "../types/movie";

const BASE_URL = "http://localhost:8000/api/";
const API_URL = `${BASE_URL}movies`;

const getMovies = async () => {
  const response = await fetch(API_URL);
  const movies: MovieProps[] = await response.json();
  return movies;
};

const getMoviesById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching movie with id ${id}`);
  }
  const movie: MovieProps = await response.json();
  return movie;
};

const createMovie = async (movie: NewMovieDTO) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    throw new Error("Error creating movie");
  }
  const newMovie: MovieProps = await response.json();
  return newMovie;
}
const updateMovie = async (movie: MovieProps) => {
  const response = await fetch(`${API_URL}/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    throw new Error(`Error updating movie with id ${movie.id}`);
  }
  const updatedMovie: MovieProps = await response.json();
  return updatedMovie;
}

const deleteMovie = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error deleting movie with id ${id}`);
  }
}

export const moviesRepo = {
  getMovies,
  getMoviesById,
  createMovie,
  updateMovie,
  deleteMovie
};
