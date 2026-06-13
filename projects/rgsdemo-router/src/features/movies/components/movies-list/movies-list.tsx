import type { MovieProps } from "../../types/movie";
import { Movie } from "../movie-item/movie-item";
import "../movies-list/movies-list.scss";

interface Props {
  movies: MovieProps[];
}

export const MoviesList: React.FC<Props> = ({ movies }) => {
  return (
    <section className="movies-container">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie}/>
      ))}
    </section>
  );
};
