import { Movie } from "./Movie.tsx";
import type { Movie } from "../types/movie.ts";
import { useState } from "react";


const getMovies = (): Movie[] => {
  return ([
    {
      id: 1,
      title: "Interstellar",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "Blade Runner 2049",
      director: "Denis Villeneuve",
      }]
  );
};

export const Movies: React.FC = () => {
  const prevMovies = getMovies(); 
  const [movies, setMovies] = useState<Movie[]>(prevMovies);

  return (
    <section className="movies-container">
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          director={movie.director}
          //description={movie.description}
          //year={movie.year}
          //tags={movie.tags}
          //image={movie.image}
          //isWatched={movie.isWatched}
        />
      ))}
    </section>
  );
};
