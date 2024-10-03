// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import { loginUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom"; // Importer useNavigate
// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const [error, setError] = React.useState(null);

//   const handleSubmit = (values) => {
//     dispatch(loginUser(values))
//       .unwrap()
//       .then(() => {
//         // Redirection ou autre action en cas de succès
//       })
//       .catch((err) => {
//         setError(err); // Stocker l'erreur dans un état
//       });
//   };

//   return (
//     <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold">Connexion</h2>
//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={LoginSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700" htmlFor="email">
//                 Email
//               </label>
//               <Field
//                 name="email"
//                 type="email"
//                 className="w-full p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className="text-sm text-red-500"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700" htmlFor="password">
//                 Mot de passe
//               </label>
//               <Field
//                 name="password"
//                 type="password"
//                 className="w-full p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="text-sm text-red-500"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
//               disabled={isSubmitting}
//             >
//               Se connecter
//             </button>

//             {/* Affichage de l'erreur */}
//             {error && <div className="mt-4 text-red-500">{error.msg}</div>}
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };
// export default LoginForm;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utiliser useNavigate

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Connexion</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(loginUser(values))
            .unwrap() // Utiliser unwrap pour gérer les erreurs de connexion
            .then(() => {
              resetForm(); // Réinitialiser le formulaire après succès
              navigate("/"); // Rediriger vers la page d'accueil
            })
            .catch((error) => {
              console.error("Erreur lors de la connexion:", error);
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Mot de passe
              </label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              disabled={isSubmitting}
            >
              Se connecter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
