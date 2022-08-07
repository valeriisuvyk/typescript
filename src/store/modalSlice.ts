import { createSlice } from "@reduxjs/toolkit";

export interface ToggleState {
  toggle: Boolean;
}

const initialState: ToggleState = {
  toggle: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWindow(state) {
      state.toggle = true;
    },
    closeModalWindow(state) {
      state.toggle = false;
    },
  },
});

export const { openModalWindow, closeModalWindow } = modalSlice.actions;

export default modalSlice.reducer;
