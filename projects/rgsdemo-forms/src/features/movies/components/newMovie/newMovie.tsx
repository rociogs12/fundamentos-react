import { Card } from "../../../../core/components/card/card";
import { useState, type ChangeEvent } from "react";
import type { Genre } from "../../types/genre";

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  tags: Genre[];
  image: string;
  isWatched: boolean;
  description: string;
}

const defaultMovie: Movie = {
  id: 0,
  title: "",
  director: "",
  year: 2026,
  tags: [],
  image: "",
  isWatched: false,
  description: "",
};

export const NewMovie: React.FC = () => {
  const [newMovie, setNewMovie] = useState<Movie>(defaultMovie);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: name === "isWatched" ? value === "watched" : value,
    }));
  };

  // Previene que renderice de nuevo al clickar en submit
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Register data: ", newMovie);
  };

  // Para el select de los años
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const currentYear = new Date().getFullYear();

  return (
    <Card>
      <h2>Add Film</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Movie title"
          value={newMovie.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="director"
          id="director"
          placeholder="Movie director"
          value={newMovie.director}
          onChange={handleChange}
          required
        />
        <div>
          <label htmlFor={"year"}>
            <span>Year </span>
            <select
              name="year"
              id={"year"}
              value={newMovie.year || ""}
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
        <fieldset name="isWatched">
          <label htmlFor="watched">
            <input
              type="radio"
              name="isWatched"
              id="watched"
              value="watched"
              checked={newMovie.isWatched === true}
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
              checked={newMovie.isWatched === false}
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
          value={newMovie.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          id="description"
          placeholder="Movie synopsis"
          value={newMovie.title}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Film</button>
      </form>
    </Card>
  );
};
