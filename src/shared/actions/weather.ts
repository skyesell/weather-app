import { createAsyncThunk } from "@reduxjs/toolkit";

import { getWeather, GetWeatherRequestT } from "../api/weather";
import { GeolocationResT, getCurrentLocation } from "../api/geolocation";
import { checkAccessLocation } from "./location";

export const addWeatherToList = createAsyncThunk(
  "weather/getWeatherByLocation",
  async (data: GetWeatherRequestT & { locationId: string; name: string }) => {
    const { lat, lon } = data;
    return await getWeather({ lat, lon });
  }
);

export const addCurrentWeather = createAsyncThunk("weather/addCurrentWeather", async (data: GeolocationResT) => {
  const { lat, lon } = data;
  return await getWeather({ lat: String(lat), lon: String(lon) });
});

export const getWeatherByCurrentLocation = createAsyncThunk(
  "weather/getWeatherByCurrentLocation",
  async (_, thunkAPI) => {
    try {
      const current = await getCurrentLocation();
      if (current) thunkAPI.dispatch(addCurrentWeather(current));
      return current;
    } catch (err) {
      thunkAPI.dispatch(checkAccessLocation(false));
      alert("Вы запретили доступ к локации");
    }
  }
);
