import { Layout } from "@core/components/layout/layout";
import type { MenuOption } from "@core/types/menu-options";
import { useNavigate } from "react-router";

const getOptions = (): MenuOption[] => {
  return [
    {
      path: "/movies",
      label: "Movies",
    },
    {
      path: "/movies/new",
      label: "Add Movie",
    },
    {
      path: "/about",
      label: "About",
    },
  ];
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const title = "Films with Rocío";
  const menuOptions: MenuOption[] = getOptions();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("movies-token");
    navigate("/login");
  };

  return (
    <Layout title={title} menuOptions={menuOptions} onLogout={handleLogout}>
      {children}
    </Layout>
  );
};
