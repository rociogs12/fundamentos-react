import "./movie-detail.scss";
import type { MovieProps } from "@features/movies/types/movie";
import { useNavigate } from "react-router";
import { useDetails } from "@features/movies/hooks/use-details";
import type { Genre } from "@features/movies/types/genre";

interface Props {
  id: MovieProps["id"];
}

export const MovieDetail: React.FC<Props> = ({ id }) => {
  const { movie } = useDetails(id); // HOOK para obtener los detalles de la película
  const navigate = useNavigate(); // HOOK para navegar programáticamente

  // Función para manejar el botón de volver atrás
  const handleGoBack = (): void => {
    navigate("/movies");
  };

  return (
    <article className="movie-detail-card">
        { movie ? (
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
        ) : 
        <p className="text-danger">Invalid movie id: {id}</p>
        }
        <button className="movie-button" onClick={handleGoBack}>
          Back to Films
        </button>
    </article>
    
  );
};
