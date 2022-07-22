import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incre: (state) => {
      state.value += 1;
    },
    decre: (state) => {
      state.value -= 1;
    },
  },
});

export const { incre, decre } = counterSlice.actions;

export default counterSlice.reducer;
