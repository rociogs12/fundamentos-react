import { useNavigate, useParams } from "react-router";
import { MovieForm } from "../components/movie-form/movie-form";
import { useDetails } from "@features/movies/hooks/use-details";
import { useMovies } from "@features/movies/hooks/use-movies";

const EditMoviePage = () => {
  const { id } = useParams();
  const { movie, isLoading } = useDetails(id!);
  const { editMovie } = useMovies();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  if (!movie) {
    navigate("/not-found");
    return null;
  }

  return (
    <MovieForm
      editedMovie={movie}
      onEdit={editMovie}
    />
  );
};
export default EditMoviePage;