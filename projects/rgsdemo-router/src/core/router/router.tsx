import React from "react";
import { Routes, Route } from "react-router";

const MoviesPage = React.lazy(() => import("@features/movies/movies-page"));
const AboutPage = React.lazy(() => import("@features/about/about-page"));
const NotFoundPage = React.lazy(() => import("@features/error/notfound-page"));

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <MoviesPage />
          </React.Suspense>
        }
      />
      <Route
        path="/movies"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <MoviesPage />
          </React.Suspense>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <MoviesPage />
          </React.Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <AboutPage />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <NotFoundPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
};
