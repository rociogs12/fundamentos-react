//import reactLogo from "../../assets/react.svg";
//import viteLogo from "../../assets/vite.svg";
//import heroImg from "../../assets/hero.png";
// import { useState } from "react";
import { type Props } from "@core/components/layout/layout.ts";
import { Header } from "@core/components/header/header.tsx";
import { Footer } from "@core/components/footer/footer.tsx";
import { Movies } from "@features/movies/Movies";

export const Layout: React.FC<Props> = ({ title }) => {
  
  return (
    <>
      <Header title={title}>
        <div></div>
      </Header>
      <main>
        <Movies />
      </main>
      <Footer />
    </>
  );
};
