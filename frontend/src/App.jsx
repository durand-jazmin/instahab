import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ReelPage from "./pages/ReelPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
