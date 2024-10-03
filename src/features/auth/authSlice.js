import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL pour Axios
const BASE_URL = "http://localhost:3001/api/auth"; // Changez le port si nécessaire

// AsyncThunk pour la connexion
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Retourner l'erreur si la requête échoue
    }
  }
);

// AsyncThunk pour l'inscription
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Retourner l'erreur si la requête échoue
    }
  }
);

// AsyncThunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Récupérer le token depuis l'état
      const response = await axios.get(`${BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }, // Envoyer le token dans l'en-tête
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    error: null,
    loading: false, // État de chargement
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Connexion réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      // Connexion échouée
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Erreur lors de la connexion";
        state.loading = false;
      })
      // Début de la connexion (chargement)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Inscription réussie
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      // Inscription échouée
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || "Erreur lors de l'inscription";
        state.loading = false;
      })
      // Début de l'inscription (chargement)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Récupération du profil réussie
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      // Récupération du profil échouée
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error =
          action.payload || "Erreur lors de la récupération du profil";
        state.loading = false;
      })
      // Début de la récupération du profil (chargement)
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Base URL pour Axios
// const BASE_URL = "http://localhost:3001/api/auth"; // Changez le port si nécessaire

// // AsyncThunk pour la connexion
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       // Utiliser l'URL complète pour la requête POST
//       const response = await axios.post(`${BASE_URL}/login`, credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Retourner l'erreur si la requête échoue
//     }
//   }
// );

// // AsyncThunk pour l'inscription
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       // Utiliser l'URL complète pour la requête POST
//       const response = await axios.post(`${BASE_URL}/register`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Retourner l'erreur si la requête échoue
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     token: null,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         // Mettre à jour l'état avec les données de l'utilisateur
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         // Mettre à jour l'état avec les données de l'utilisateur après l'inscription
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
