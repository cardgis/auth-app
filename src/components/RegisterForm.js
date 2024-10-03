import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est requis"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utiliser useNavigate

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Inscription</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(registerUser(values))
            .unwrap()
            .then(() => {
              navigate("/login"); // Rediriger après l'inscription
            })
            .catch((error) => {
              console.error("Erreur lors de l'inscription:", error);
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">
                Nom
              </label>
              <Field
                name="name"
                type="text"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

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
              S'inscrire
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import { registerUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom"; // Importer useNavigate

// const RegisterSchema = Yup.object().shape({
//   name: Yup.string().required("Le nom est requis"),
//   email: Yup.string().email("Email invalide").required("L'email est requis"),
//   password: Yup.string()
//     .min(6, "Le mot de passe doit comporter au moins 6 caractères")
//     .required("Le mot de passe est requis"),
// });

// const RegisterForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Hook pour naviguer
//   const { isAuthenticated } = useSelector((state) => state.auth); // Sélectionner l'état d'authentification

//   return (
//     <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold">Inscription</h2>
//       <Formik
//         initialValues={{ name: "", email: "", password: "" }}
//         validationSchema={RegisterSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           dispatch(registerUser(values)).then((action) => {
//             if (action.type === "auth/register/fulfilled") {
//               // Rediriger l'utilisateur après inscription réussie
//               navigate("/login");
//             }
//             setSubmitting(false);
//           });
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700" htmlFor="name">
//                 Nom
//               </label>
//               <Field
//                 name="name"
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="name"
//                 component="div"
//                 className="text-sm text-red-500"
//               />
//             </div>

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
//               S'inscrire
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default RegisterForm;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import { registerUser } from "../features/auth/authSlice";

// const RegisterSchema = Yup.object().shape({
//   name: Yup.string().required("Le nom est requis"),
//   email: Yup.string().email("Email invalide").required("L'email est requis"),
//   password: Yup.string()
//     .min(6, "Le mot de passe doit comporter au moins 6 caractères")
//     .required("Le mot de passe est requis"),
// });

// const RegisterForm = () => {
//   const dispatch = useDispatch();

//   return (
//     <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="mb-6 text-2xl font-bold">Inscription</h2>
//       <Formik
//         initialValues={{ name: "", email: "", password: "" }}
//         validationSchema={RegisterSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           dispatch(registerUser(values));
//           setSubmitting(false);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="mb-4">
//               <label className="block text-gray-700" htmlFor="name">
//                 Nom
//               </label>
//               <Field
//                 name="name"
//                 type="text"
//                 className="w-full p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="name"
//                 component="div"
//                 className="text-sm text-red-500"
//               />
//             </div>

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
//               S'inscrire
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default RegisterForm;
