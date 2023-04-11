import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { locationSlice } from "../../../entities/location/model";

export interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});
export const { setOpenModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
