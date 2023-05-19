import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 
    {jour: '',
    nbPersonneSemaine: '',
  },
};

export const semaineSlice = createSlice({
  name: "semaine",
  initialState,
  reducers: {
    addSemaine: (state, action) => {
      state.value.jour.push(action.payload.jour);
      state.value.nbPersonneSemaine.push(action.payload.nbPersonneSemaine);
    },
  
  },
});

export const { addSemaine} = semaineSlice.actions;
export default semaineSlice.reducer;
