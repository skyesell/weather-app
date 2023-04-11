import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetWeatherRequestT } from "../api/weather";
import { getWeather } from "../api/weather";
import { GeolocationResT, getCurrentLocation } from "../api/geolocation";

export const deleteLocation = createAction<string>("deleteLocation");
export const checkAccessLocation = createAction<boolean>("checkLocation");
export const createLocation = createAction<{ lat: number; lon: number }>("createLocation");

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
