import "../movie-item/movie-item.scss";
import { Link } from "react-router";
import type { MovieProps } from "../../types/movie.ts";

interface Props {
  movie: MovieProps;
}

export const Movie: React.FC<Props> = ({ movie }) => {
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
      </div>
    </article>
  );
};
