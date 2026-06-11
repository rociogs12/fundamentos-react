import { MoviesList } from "./components/movies-list/movies-list";
import { MovieForm } from "./components/movie-form/movie-form";
import { MovieDetail } from "./components/movie-detail/movie-detail";
import { useMovies } from "./hooks/use-movies";
import { useParams } from "react-router";
import { useState, type SyntheticEvent } from "react";

const MoviesPage: React.FC = () => {
  const { error, movies, addMovie, editMovie, deleteMovie } = useMovies();
  const { id } = useParams<{ id: string }>();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDetailsToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    setIsDetailsOpen(event.currentTarget.open);
  };

  const handleMovieAdded = () => {
    setIsDetailsOpen(false);
  };

  return (
    <>
      <section>
        {id ? (
          <MovieDetail id={id} />
        ) : (
          <>
            {error && <p className="error">{error}</p>}
            <details open={isDetailsOpen} onToggle={handleDetailsToggle}>
              <summary>Add Film</summary>
              <MovieForm onAdd={addMovie} onSubmitSuccess={handleMovieAdded} />
            </details>
            {!error && (
              <MoviesList
                movies={movies}
                onDelete={deleteMovie}
                onEdit={editMovie}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default MoviesPage;
