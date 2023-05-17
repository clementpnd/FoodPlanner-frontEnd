import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [semaine:
    {jour: '',
    nbPersonneSemaine: '',
  }],
};

export const userSlice = createSlice({
  name: "semaines",
  initialState,
  reducers: {
    addSemaine: (state, action) => {
      state.value.jour.push(action.payload.jour);
      state.value.nbPersonneSemaine.push(action.payload.nbPersonneSemaine);
    },
  
  },
});

export const { addSemaine} = userSlice.actions;
export default userSlice.reducer;
