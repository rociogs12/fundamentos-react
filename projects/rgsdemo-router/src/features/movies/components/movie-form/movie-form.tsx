import type { MovieProps, NewMovieDTO } from "@features/movies/types/movie";
import { useState, type ChangeEvent } from "react";
import { GENRES } from "@features/movies/types/genre";
import type { Genre } from "@features/movies/types/genre";
import "./movie-form.scss";

interface Props {
  editedMovie?: MovieProps;
  onAdd?: (data: NewMovieDTO) => void;
  onEdit?: (data: MovieProps) => void;
}

export const MovieForm: React.FC<Props> = ({ onAdd, onEdit, editedMovie }) => {
  // Para el select de los años
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const currentYear = new Date().getFullYear();

  const defaultMovie: MovieProps | NewMovieDTO = editedMovie || {
    title: "",
    director: "",
    year: 2026,
    genre: [],
    image: "",
    isWatched: false,
    description: "",
  };

  const [movie, setMovie] = useState(defaultMovie);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]:
        name === "isWatched"
          ? value === "watched"
          : name === "year"
            ? Number(value)
            : value,
    }));
  };

  const handleGenreChange = (genre: Genre) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      genre: prevMovie.genre.includes(genre)
        ? prevMovie.genre.filter((existinggenre) => existinggenre !== genre)
        : [...prevMovie.genre, genre],
    }));
  };

  // Previene que renderice de nuevo al clickar en submit
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedMovie && onEdit && "id" in movie) {
      console.log("Actualized Movie: ", movie);
      onEdit(movie);
    } else if (onAdd) {
      console.log("Register data: ", movie);
      onAdd(movie);
    }
  };

  return (
    <section className="movie-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          id="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
          required
        />
        <div>
          <label htmlFor={"year"}>
            <span>Year </span>
            <select
              name="year"
              id={"year"}
              value={movie.year || ""}
              onChange={handleChange}
            >
              {range(1900, currentYear).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <fieldset className="genres-fieldset">
          <legend>Genres</legend>

          {GENRES.map((genre) => (
            <label key={genre} className="genre-option">
              <input
                type="checkbox"
                checked={movie.genre.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              <span>{genre}</span>
            </label>
          ))}
        </fieldset>

        <fieldset name="isWatched">
          <label htmlFor="watched">
            <input
              type="radio"
              name="isWatched"
              id="watched"
              value="watched"
              checked={movie.isWatched === true}
              onChange={handleChange}
            />
            <span>Watched</span>
          </label>
          <label htmlFor="toWatch">
            <input
              type="radio"
              name="isWatched"
              id="toWatch"
              value="toWatch"
              checked={movie.isWatched === false}
              onChange={handleChange}
            />
            <span>To Watch</span>
          </label>
        </fieldset>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Image link"
          value={movie.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Movie synopsis"
          value={movie.description}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editedMovie ? 'Save changes' : 'Add Film'}
        </button>
      </form>
    </section>
  );
};
