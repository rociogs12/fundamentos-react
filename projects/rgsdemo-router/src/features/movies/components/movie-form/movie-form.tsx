import type { MovieProps, NewMovieDTO } from "@features/movies/types/movie";
import { useEffect, useState, type ChangeEvent } from "react";
import { getGenres, type Genres } from "@features/movies/services/genres-repo";
import { useNavigate } from "react-router";
import "./movie-form.scss";
import { uploadImage } from "@features/movies/services/images-repo";

interface Props {
  editedMovie?: MovieProps;
  onAdd?: (data: NewMovieDTO) => Promise<void>;
  onEdit?: (data: MovieProps) => Promise<void>;
  onSubmitSuccess?: () => void;
}

export const MovieForm: React.FC<Props> = ({
  onAdd,
  onEdit,
  editedMovie,
  onSubmitSuccess,
}) => {
  // FORMS
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Pelicula inicial
  const defaultMovie: MovieProps | NewMovieDTO = editedMovie || {
    title: "",
    director: "",
    year: 2026,
    genre: [],
    image: "",
    isWatched: false,
    description: "",
  };

  // ESTADOS
  const [movie, setMovie] = useState(defaultMovie);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
  }, []);

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

  const handleGenreChange = (genre: string) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      genre: prevMovie.genre.includes(genre)
        ? prevMovie.genre.filter((existinggenre) => existinggenre !== genre)
        : [...prevMovie.genre, genre],
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    // Previene que renderice de nuevo al clickar en submit
    event.preventDefault();
    let imageUrl = movie.image;
    // si el usuario ha seleccionado archivo, lo subimos
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    const finalMovie = {
      ...movie,
      image: imageUrl,
    };

    if (editedMovie && onEdit && "id" in movie) {
      await onEdit(finalMovie as MovieProps);
      navigate("/movies");
    } else if (onAdd) {
      await onAdd(finalMovie);
      onSubmitSuccess?.();
      navigate("/movies");
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

          {genres.map((genre) => (
            <label key={genre.id} className="genre-option">
              <input
                type="checkbox"
                checked={movie.genre.includes(genre.name)}
                onChange={() => handleGenreChange(genre.name)}
              />
              <span>{genre.name}</span>
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
          type="file"
          accept="image/*"
          onChange={(img) => {
            const file = img.target.files?.[0] || null;
            setImageFile(file);
          }}
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
          {editedMovie ? "Save changes" : "Add Film"}
        </button>
      </form>
    </section>
  );
};
