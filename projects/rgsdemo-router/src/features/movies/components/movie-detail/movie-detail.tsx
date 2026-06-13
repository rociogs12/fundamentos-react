import "./movie-detail.scss";
import type { MovieProps } from "@features/movies/types/movie";
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import { useDetails } from "@features/movies/hooks/use-details";
import type { Genre } from "@features/movies/types/genre";

interface Props {
  id: MovieProps["id"];
  isLoading?: boolean;
  onDelete: (id: string) => Promise<void>;
  // onEdit: (movie: MovieProps) => void;
}

export const MovieDetail: React.FC<Props> = ({ id, onDelete }) => {
  const { movie, isLoading } = useDetails(id); // HOOK para obtener los detalles de la película
  const navigate = useNavigate(); // HOOK para navegar programáticamente
  const dialogRef = useRef<HTMLDialogElement>(null); // Referencia al diálogo de confirmación

  useEffect(() => {
    if (!isLoading && !movie) {
      navigate("/not-found");
    }
  }, [movie, isLoading, navigate]);

  // Función para manejar el botón de volver atrás
  const handleGoBack = (): void => {
    navigate("/movies");
  };

  const handleDeleteClick = (): void => {
    dialogRef.current?.showModal();
  };

  const handleCancelDelete = (): void => {
    dialogRef.current?.close();
  };

  const handleConfirmDelete = async (): Promise<void> => {
    if (!movie) return;

    try {
      await onDelete(movie.id);
      dialogRef.current?.close();
      navigate("/movies");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <article className="movie-detail-card">
      {movie ? (
        <>
          <div className="movie-body">
            <h5 className="movie-title">{movie.title}</h5>
            <h6 className="movie-subtitle">{movie.director}</h6>
          </div>
          <img src={movie.image}></img>
          <ul className="list-group list-group-flush">
            <li className="list-group-item movie-year">{movie.year}</li>
            <li className="list-group-item movie-genre-tags">
              {movie.genre.map((g: Genre) => (
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
        </>
      ) : (
        <p className="text-danger">Invalid movie id: {id}</p>
      )}
      <button className="movie-button" onClick={handleGoBack}>
        Back to Films
      </button>
      <button
        className="movie-button movie-button--delete"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
      <dialog ref={dialogRef} className="delete-dialog">
        <h3>Delete Movie</h3>

        <p>
          Are you sure you want to delete <strong>{movie?.title}</strong>?
        </p>

        <div className="dialog-buttons">
          <button className="movie-button" onClick={handleConfirmDelete}>
            Yes, delete
          </button>

          <button className="movie-button" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      </dialog>
    </article>
  );
};
