import type { MovieProps } from "../types/movie";
import { moviesRepo } from "../services/movies-repo";
import { useEffect, useState } from "react";

type UseDetailType = {
  movie: MovieProps | null;
  isLoading: boolean;
};

export const useDetails = (id: MovieProps["id"]): UseDetailType => {
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async (): Promise<void> => {
      try {
        const response = await moviesRepo.getMoviesById(id);
        setMovie(response || null);
        console.log("Movie details loaded successfully: ", response);
      } catch (error) {
        console.error(
          "Failed to load movie details: ",
          (error as Error).message,
        );
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  return { movie, isLoading };
};
