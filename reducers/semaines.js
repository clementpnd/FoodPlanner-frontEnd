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
  
  },
});

export const { addSemaine } = semainesSlice.actions;
export default semainesSlice.reducer;
