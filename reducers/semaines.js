import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

export const semainesSlice = createSlice({
  name: "semaines",
  initialState,
  reducers: {
    addSemaine: (state, action) => {
     state.value = action.payload
    },
    removeAllSemaine : (state,action) =>{
      state.value = [];
    }
  
  },
});

export const { addSemaine,removeAllSemaine } = semainesSlice.actions;
export default semainesSlice.reducer;
