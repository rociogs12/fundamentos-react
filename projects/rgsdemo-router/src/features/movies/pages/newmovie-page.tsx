import { MovieForm } from "../components/movie-form/movie-form";
import { useMovies } from "../hooks/use-movies";
import "./newmovie-page.scss";


const NewMoviePage: React.FC = () => {
  const { addMovie } = useMovies();

  return <MovieForm onAdd={addMovie} />;
};

export default NewMoviePage;
