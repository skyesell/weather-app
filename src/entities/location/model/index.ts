import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addWeatherToList,
  checkAccessLocation,
  createLocation,
  deleteLocation,
  getWeatherByCurrentLocation,
} from "../../../shared/actions";
import { getFromStorage, saveInStorage } from "../../../shared/localstorage/localstorage";

export type LocationT = {
  id: string;
  name: string;
  lat: string;
  lon: string;
};

export interface LocationState {
  geoLocation: Omit<LocationT, "id"> | null;
  locationsList: LocationT[];
  currentLocation: { lat: number; lon: number } | null;
  geolocationLoading: boolean;
  accessLocation: boolean;
  locationId: string;
}

const initialState: LocationState = {
  geoLocation: null,
  locationsList: [],
  currentLocation: null,
  geolocationLoading: false,
  accessLocation: false,
  locationId: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    init: (state) => {
      const locations = getFromStorage<LocationT[]>("locations");
      state.locationsList = locations ?? [];
    },
    currentLocationId: (state, action: PayloadAction<{ id: string }>) => {
      state.locationId = action.payload.id;
    },
    changeLocationName: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const locationIndex = state.locationsList.findIndex((location) => location.id === action.payload.id);
      if (locationIndex >= 0) {
        const locationsCpy = [...state.locationsList];
        locationsCpy[locationIndex].name = action.payload.newName;
        saveInStorage("locations", locationsCpy);
        state.locationsList = locationsCpy;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWeatherToList.fulfilled, (state, action) => {
        const { locationId, name, lon, lat } = action.meta.arg;
        const locationsCpy = [...state.locationsList];
        locationsCpy.push({ lat, lon, name, id: locationId });
        saveInStorage("locations", locationsCpy);
        state.locationsList = locationsCpy;
      })
      .addCase(createLocation, (state, action) => {
        state.currentLocation = { lon: action.payload.lon, lat: action.payload.lat };
      })
      .addCase(checkAccessLocation, (state, action) => {
        state.accessLocation = action.payload;
      })
      .addCase(deleteLocation, (state, action) => {
        state.locationsList = state.locationsList.filter((location) => location.id !== action.payload);
      })
      .addCase(getWeatherByCurrentLocation.pending, (state) => {
        state.geolocationLoading = true;
      })
      .addCase(getWeatherByCurrentLocation.fulfilled, (state, action) => {
        if (action.payload) {
          const { lat, lon } = action.payload;
          state.geoLocation = { ...state.geoLocation, lon: String(lon), lat: String(lat), name: "Текущая" };
          state.geolocationLoading = false;
        }
      });
  },
});

export const { changeLocationName, init, currentLocationId } = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
