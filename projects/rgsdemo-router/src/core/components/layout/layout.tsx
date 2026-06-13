import { type ReactNode } from "react";
import { Header } from "@core/components/header/header.tsx";
import { Footer } from "@core/components/footer/footer.tsx";
import { Menu } from "@core/components/menu/menu";
import { type MenuOption } from "@core/types/menu-options";
import type { UserLogin } from "@features/auth/types/user";
import { UserLogged } from "@features/auth/components/logged/Userlogged";
import { useAuth } from "@features/auth/hooks/use-auth";

export type Props = {
  readonly children?: ReactNode;
  readonly title: string;
  readonly menuOptions: MenuOption[];
  readonly user?: UserLogin;
  readonly onLogout?: () => void;
};

export const Layout: React.FC<Props> = ({
  title,
  menuOptions,
  children,
  onLogout,
}) => {
  const { getUserFromStorage } = useAuth();
  const user = getUserFromStorage();
  //console.log("user", user);
  return (
    <>
      <Header title={title}>
        <Menu options={menuOptions} />
        {user && onLogout && <UserLogged user={user} onLogout={onLogout} />}
      </Header>
      <main>{children}</main>
      <Footer />
    </>
  );
};
