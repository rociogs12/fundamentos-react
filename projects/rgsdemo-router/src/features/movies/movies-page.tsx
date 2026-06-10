import { MoviesList } from "./components/movies-list/movies-list";
import { MovieForm } from "./components/movie-form/movie-form";
import { MovieDetail } from "./components/movie-detail/movie-detail";
import { useMovies } from "./hooks/use-movies";
import { useParams } from "react-router";

const MoviesPage: React.FC = () => {
  const { movies, addMovie, editMovie, deleteMovie } = useMovies();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <section>
        {id ? (
          <MovieDetail id={id} />
        ) : (
          <>
            <details>
              <summary>Add Film</summary>

              <MovieForm onAdd={addMovie} />
            </details>
            <MoviesList
              movies={movies}
              onDelete={deleteMovie}
              onEdit={editMovie}
            />
          </>
        )}
      </section>
    </>
  );
};

export default MoviesPage;
