import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    prenom: "",
    pseudo: "",
    mail: "",
    password: "",
    photoProfil: "",
    nbPersonne: "",
    preference: [],
    recetteFavoris: [],
  },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.value.token = action.payload.token;
      state.value.prenom = action.payload.prenom;
      state.value.pseudo = action.payload.pseudo;
      state.value.mail = action.payload.mail;
      state.value.password = action.payload.password;
      state.value.photoProfil = action.payload.photoProfil;
      state.value.nbPersonne = action.payload.nbPersonne;
      state.value.preference.push(action.payload.preference);
      state.value.recetteFavoris.push(action.payload.recetteFavoris);
    },
    removeUsers: (state, action) => {
      state.value.token = "";
      state.value.prenom = "";
      state.value.pseudo = "";
      state.value.mail = "";
      state.value.password = "";
      state.value.nbPersonne = "";
      state.value.photoProfil = "";
      state.value.preference = [];
      state.value.recetteFavoris = [];
    },
  },
});

export const { addUsers} = userSlice.actions;
export default userSlice.reducer;
