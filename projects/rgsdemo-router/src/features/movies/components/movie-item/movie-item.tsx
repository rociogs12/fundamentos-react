import "../movie-item/movie-item.scss";
import { Link } from "react-router";
import { useRef } from "react";
import type { MovieProps } from "../../types/movie.ts";
import { MovieForm } from "../movie-form/movie-form.tsx";

interface Props {
  movie: MovieProps;
  onDelete: (id: string) => void;
  onEdit: (movie: MovieProps) => void;
}

export const Movie: React.FC<Props> = ({ movie, onDelete, onEdit }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleDelete = () => {
    console.log(`Película con id ${movie.id} eliminada`)
    onDelete(movie.id);
  };
  const handleEdit = (movie: MovieProps) => {
    console.log(`Película con id ${movie.id} editado`);
    onEdit(movie);
    dialogRef.current?.close();
  };

  const handleEditStart = () => {
    console.log(`Película con id ${movie.id} preparado para edición`);
    // Se abre el product form con los datos para editar
    dialogRef.current?.showModal();
  };

  return (
    <article className="movie-card">
      <div className="movie-body">
        <h5 className="movie-title">{movie.title}</h5>
        <h6 className="movie-subtitle">{movie.director}</h6>
      </div>
      <img src={movie.image}></img>
      <ul className="list-group list-group-flush">
        <li className="list-group-item movie-year">{movie.year}</li>
        <li className="list-group-item movie-genre-tags">
          {movie.genre.map((g) => (
            <span key={g} className="genre-tag">
              {g}
            </span>
          ))}
        </li>

        <li className="list-group-item">
          {movie.isWatched ? "Watched" : "To Watch"}
        </li>
        <li className="list-group-item">{movie.description}</li>
      </ul>
      <div className="movie-buttons">
        <Link to={"/movie/" + movie.id}>
          <button className="movie-button movie-button--detail">Detail</button>
        </Link>
        <button className="movie-button" onClick={handleEditStart}>
          Edit
        </button>
        <button
          className="movie-button movie-button--delete"
          onClick={handleDelete}
        >
          Delete
        </button>
        <dialog ref={dialogRef}>
          <MovieForm onEdit={handleEdit} editedMovie={movie} />
        </dialog>
      </div>
    </article>
  );
};
