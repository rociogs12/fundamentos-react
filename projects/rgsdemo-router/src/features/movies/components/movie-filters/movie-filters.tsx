import { useState } from "react";
import type { MovieProps } from "../../types/movie";

interface Props {
  movies: MovieProps[];
  onFiltered: (movies: MovieProps[]) => void;
}

export const MoviesFilters: React.FC<Props> = ({ movies, onFiltered }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [watched, setWatched] = useState<"all" | "watched" | "notWatched">(
    "all",
  );
  const [minYear, setMinYear] = useState<number | "">("");
  const [maxYear, setMaxYear] = useState<number | "">("");
  const handleDetailsClick = (event: React.MouseEvent<HTMLDetailsElement>) => {
    event.preventDefault(); 
    setOpen((prev) => !prev);
  };    

  const applyFilters = () => {
    let result = [...movies];

    // NOMBRE
    if (title.trim()) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    // VISTA/NO VISTA
    if (watched !== "all") {
      result = result.filter((movie) =>
        watched === "watched" ? movie.isWatched : !movie.isWatched,
      );
    }
    // AÑO
    if (minYear !== "") {
      result = result.filter((movie) => movie.year >= Number(minYear));
    }
    if (maxYear !== "") {
      result = result.filter((movie) => movie.year <= Number(maxYear));
    }

    onFiltered(result);
    setOpen(false);
  };

  const resetFilters = () => {
    setTitle("");
    setWatched("all");
    setMinYear("");
    setMaxYear("");
    onFiltered(movies);
  };

  return (
    <details
      className="movies-filters"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary
        onClick={handleDetailsClick}
      >
        Filters
      </summary>
      <div className="filters-body">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={watched}
          onChange={(e) => setWatched(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="watched">Watched</option>
          <option value="notWatched">To Watch</option>
        </select>
        <input
          type="number"
          placeholder="Min year"
          value={minYear}
          onChange={(e) =>
            setMinYear(e.target.value ? Number(e.target.value) : "")
          }
        />
        <input
          type="number"
          placeholder="Max year"
          value={maxYear}
          onChange={(e) =>
            setMaxYear(e.target.value ? Number(e.target.value) : "")
          }
        />
        <button onClick={applyFilters}>Apply</button>
        <button onClick={resetFilters}>Reset</button>
      </div>
    </details>
  );
};
