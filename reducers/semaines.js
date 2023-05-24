import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

export const semainesSlice = createSlice({
  name: "semaines",
  initialState,
  reducers: {
    addSemaine: (state, action) => {
      //console.log("reducer:", action.payload)
     state.value = action.payload
    },
    removeAllSemaine : (state,action) =>{
      state.value = [];
    }
  
  },
});

export const { addSemaine,removeAllSemaine } = semainesSlice.actions;
export default semainesSlice.reducer;
