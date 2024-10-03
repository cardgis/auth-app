import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { fetchUserProfile } from "../slices/authSlice"; // Importer l'action
import { fetchUserProfile } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Récupérer les informations du profil de l'utilisateur
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-8 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Profil de l'utilisateur</h2>
      <p className="text-gray-700">
        <strong>Nom:</strong> {user?.name}
      </p>
      <p className="text-gray-700">
        <strong>Email:</strong> {user?.email}
      </p>
      <p className="text-gray-700">
        <strong>ID Utilisateur:</strong> {user?.id}
      </p>
    </div>
  );
};

export default Profile;
