import { type ReactNode } from "react";
import { Header } from "@core/components/header/header.tsx";
import { Footer } from "@core/components/footer/footer.tsx";
import { Menu } from "@core/components/menu/menu";
import { type MenuOption } from "@core/types/menu-options";

export type Props = {
  readonly children?: ReactNode;
  readonly title: string;
  readonly menuOptions: MenuOption[];
};

export const Layout: React.FC<Props> = ({ title, menuOptions, children }) => {
  return (
    <>
      <Header title={title}>
        <Menu options={menuOptions} />
      </Header>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};
