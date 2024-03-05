import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ReelPage from "./pages/ReelPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import Auth from "./components/Auth";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback="Oooops!! There was an error">
        <Routes>
          {/* Ruta para el componente Auth */}
          <Route path="/" element={<Auth />} />

          {/* Otras rutas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<SignupPage />} />
          <Route path="/reel/:id" element={<ReelPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;