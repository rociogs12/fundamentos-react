import { useState, useEffect } from "react";
import type { MovieProps, NewMovieDTO } from "@features/movies/types/movie";
import { moviesRepo } from "@features/movies/services/movies-repo";

export const useMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  // UseEffect no puede ser asíncrono así que se le hace una función load para
  // manejar asincronía.
  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const movies = await moviesRepo.getMovies();
        setMovies(movies);
      } catch (error) {
        setError("Error loading movies");
        console.error("Error loading movies:", error);
      }
    };
    load();
  }, []);

  const addMovie = async (movie: NewMovieDTO) => {
    try {
      const newMovie: MovieProps = await moviesRepo.createMovie(movie);
      console.log(`New movie added (API) ${newMovie}`);
      setMovies((movies) => [newMovie, ...movies]);
    } catch (error) {
      setError("Error adding movie");
      console.error("Error adding movie:", error);
    }
  };

  const editMovie = async (movie: MovieProps) => {
    console.log(`Movie with id ${movie.id} edited (API)`);
    try {
      const updatedMovie: MovieProps = await moviesRepo.updateMovie(movie);

      setMovies((movies) =>
        movies.map((existingMovie) =>
          existingMovie.id === movie.id ? updatedMovie : existingMovie,
        ),
      );
    } catch (error) {
      setError("Error editing movie");
      console.error("Error editing movie:", error);
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      await moviesRepo.deleteMovie(id);
      console.log(`Film with id ${id} has been deleted (API)`);
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
    } catch (error) {
      setError("Error deleting movie");
      console.error("Error deleting movie:", error);
    }
  };

  return {
    error,
    movies,
    addMovie,
    editMovie,
    deleteMovie,
  };
};
