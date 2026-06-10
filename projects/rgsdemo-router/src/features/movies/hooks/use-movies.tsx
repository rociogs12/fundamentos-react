import { useState, useEffect } from "react";
import type { MovieProps, NewMovieDTO } from "@features/movies/types/movie";
import { moviesRepo } from "@features/movies/services/movies-repo";

export const useMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    setMovies(moviesRepo.getMovies());
  }, []);

  const addMovie = (movie: NewMovieDTO) => {
    const newMovie: MovieProps = {
      id: crypto.randomUUID(),
      ...movie,
    };

    setMovies((movies) => [newMovie, ...movies]);
  };

  const editMovie = (movie: MovieProps) => {
    console.log(`Film with id ${movie.id} preparada para edición`);
    setMovies((movies) =>
      movies.map((existingMovie) =>
        existingMovie.id === movie.id ? movie : existingMovie,
      ),
    );
  };

  const deleteMovie = (id: string) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  return {
    movies,
    addMovie,
    editMovie,
    deleteMovie,
  };
};
