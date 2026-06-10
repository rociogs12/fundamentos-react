import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import "./index.css";
import { App } from "./core/components/app/App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
