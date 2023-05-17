import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {

  },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.value = action.payload
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
    addPhotoProfil : (state, action) => {
      state.value.photoProfil = action.payload;
    },
    removePhotoProfil : (state, action) => {
      state.value.photoProfil = "";
    },
  },
});

export const { addUsers, removeUsers, addPhotoProfil, removePhotoProfil} = userSlice.actions;
export default userSlice.reducer;
