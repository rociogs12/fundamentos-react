import { HomePage } from "@features/home/home-page";
import { MoviesPage } from "@features/movies/movies-page";
import { AboutPage } from "@features/about/about";
import { NotFoundPage } from "@features/error/notfound-page";
import { useRouter } from "./use-router";

export const Router: React.FC = () => {
  const currentPath = useRouter();

  let CurrentPage: React.FC = () => null;

  switch (currentPath) {
    case "/":
    case "/home":
      CurrentPage = HomePage;
      break;
    case "/movies":
      CurrentPage = MoviesPage;
      break;
    case "/about":
      CurrentPage = AboutPage;
      break;
    default:
      CurrentPage = NotFoundPage;
      break;
  }

  return <CurrentPage />;
};
