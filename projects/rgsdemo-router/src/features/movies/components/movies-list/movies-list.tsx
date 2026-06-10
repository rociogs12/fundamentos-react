import type { MovieProps } from "../../types/movie";
import { Movie } from "../movie-item/movie-item";
import "../movies-list/movies-list.scss";

interface Props {
  movies: MovieProps[];
  onDelete: (id: string) => void;
  onEdit: (movie: MovieProps) => void;
}

export const MoviesList: React.FC<Props> = ({ movies, onDelete, onEdit }) => {
  return (
    <section className="movies-container">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </section>
  );
};
