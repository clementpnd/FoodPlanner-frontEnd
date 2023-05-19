import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 
  { 
    
  },
};

export const semaineSlice = createSlice({
  name: "semaine",
  initialState,
  reducers: {
    addSemaine: (state, action) => {
      state.value = action.payload
    },
  
  },
});

export const { addSemaine} = semaineSlice.actions;
export default semaineSlice.reducer;
