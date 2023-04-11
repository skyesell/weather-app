import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { locationReducer } from "../../entities/location/model";
import { weatherReducer } from "../../entities/weather/model";
import { modalReducer } from "../layouts/model";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
