import React from "react";
import { Routes, Route } from "react-router";
import { ProtectedRoute } from "./protectedroute";
import { AppLayout } from "@core/components/layout/app-layout";

const MoviesPage = React.lazy(() => import("@features/movies/movies-page"));
const AboutPage = React.lazy(() => import("@features/about/about-page"));
const NotFoundPage = React.lazy(() => import("@features/error/notfound-page"));
const NewMoviePage = React.lazy(
  () => import("@features/movies/pages/newmovie-page"),
);
const AuthPage = React.lazy(() => import("@features/auth/auth-page"));

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <AppLayout>
                <MoviesPage />
              </AppLayout>
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <AuthPage />
          </React.Suspense>
        }
      />
      <Route
        path="/movies"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <AppLayout>
                <MoviesPage />
              </AppLayout>
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <AppLayout>
                <MoviesPage />
              </AppLayout>
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/movies/new"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <AppLayout>
                <NewMoviePage />
              </AppLayout>
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <AppLayout>
                <AboutPage />
              </AppLayout>
            </ProtectedRoute>
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <NotFoundPage />
            </ProtectedRoute>
          </React.Suspense>
        }
      />
    </Routes>
  );
};
