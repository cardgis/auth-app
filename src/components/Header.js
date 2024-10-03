import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-lg font-bold">
            Decalton
          </Link>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            className="p-2 rounded-md"
            placeholder="Rechercher..."
          />
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:underline">
                Connexion
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Inscription
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:underline"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
