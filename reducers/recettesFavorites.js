import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { recettesFavorites: [], id: null },
};
export const recettesFavoritesSlice = createSlice({
  name: "recettesFavorites",
  initialState,
  reducers: {
    addFavoriteRecette: (state, action) => {
      state.value.recettesFavorites.push(action.payload);
    },
    removeFavoriteRecette: (state, action) => {
      state.value.recettesFavorites.filter((e) => e.nom !== action.payload);
    },
    displayFavoriteRecette: (state, action) => {
      state.value.recettesFavorites.filter((e) => e._id === action.payload);
    },
    findId: (state, action) => {
      state.value.id = action.payload;
    },
  },
});

export const {
  addFavoriteRecette,
  removeFavoriteRecette,
  displayFavoriteRecette,
  findId,
} = recettesFavoritesSlice.actions;
export default recettesFavoritesSlice.reducer;
