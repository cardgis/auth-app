import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./components/Profile"; // Importez le nouveau composant
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Affiche le Header avec la barre de recherche */}
        <Header />

        <div className="container py-8 mx-auto">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />{" "}
            {/* Route pour le profil */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div className="text-center">
                    <h1 className="text-3xl">Bienvenue, {user?.name}</h1>
                    <p className="text-gray-600">
                      Vous êtes connecté en tant que {user?.email}
                    </p>
                    <p>
                      <a href="/profile" className="text-blue-500 underline">
                        Voir le profil
                      </a>
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h1 className="text-3xl">Bienvenue sur notre site !</h1>
                    <p className="text-gray-600">
                      Veuillez vous connecter ou vous inscrire.
                    </p>
                  </div>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import { useSelector } from "react-redux";

// function App() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         {/* Affiche le Header avec la barre de recherche */}
//         <Header />

//         <div className="container py-8 mx-auto">
//           <Routes>
//             <Route path="/login" element={<LoginForm />} />
//             <Route path="/register" element={<RegisterForm />} />
//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? (
//                   <div className="text-center">
//                     <h1 className="text-3xl">Bienvenue, {user?.name}</h1>
//                     <p className="text-gray-600">
//                       Vous êtes connecté en tant que {user?.email}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <h1 className="text-3xl">Bienvenue sur notre site !</h1>
//                     <p className="text-gray-600">
//                       Veuillez vous connecter ou vous inscrire.
//                     </p>
//                   </div>
//                 )
//               }
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
