import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    nbPersonne: "",
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value > 0 && state.value--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
