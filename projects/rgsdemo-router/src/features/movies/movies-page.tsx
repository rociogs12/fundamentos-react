import { MoviesList } from "./components/movies-list/movies-list";
import { MovieDetail } from "./components/movie-detail/movie-detail";
import { MoviesFilters } from "./components/movie-filters/movie-filters";
import { useMovies } from "./hooks/use-movies";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const MoviesPage: React.FC = () => {
  const { error, movies, deleteMovie } = useMovies();
  const { id } = useParams<{ id: string }>();

  const [filteredMovies, setFilteredMovies] = useState(movies);
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  return (
    <>
      <section>
        {id ? (
          <MovieDetail id={id} onDelete={deleteMovie}/>
        ) : (
          <>
            {error && <p className="error">{error}</p>}
            {!error && (
              <>
                <MoviesFilters movies={movies} onFiltered={setFilteredMovies} />
                <MoviesList movies={filteredMovies} />
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default MoviesPage;
