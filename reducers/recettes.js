import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    recettes: [],
  },
};

export const recetteSlice = createSlice({
  name: "recettes",
  initialState,
  reducers: {
    addRecette: (state, action) => {
      state.value.recettes.push(action.payload);
    },
    changeRecette: (state, action) => {
      state.value.recettes = action.payload;
    },
    removeRecette: (state, action) => {
      state.value.recettes.filter((e) => e.nom !== action.payload);
    },
    removeAllRecette: (state, action) => {
      state.value.recettes = [];
    },
  },
});

export const { addRecette, changeRecette, removeRecette, removeAllRecette } =
  recetteSlice.actions;
export default recetteSlice.reducer;
