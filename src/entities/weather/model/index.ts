import { createSlice } from "@reduxjs/toolkit";

import { GetWeatherResponseT, WeatherStoreT } from "../../../shared/api/weather";
import { addCurrentWeather, addWeatherToList, deleteLocation } from "../../../shared/actions";

export type WeatherT = WeatherStoreT & { locationId: string };

export type WeatherStateT = {
  geoWeather: Omit<WeatherT, "locationId"> | null;
  weatherList: WeatherT[];
  weatherLoading: boolean;
};

const initialState: WeatherStateT = {
  geoWeather: null,
  weatherList: [],
  weatherLoading: false,
};

const responseMapper = (obj: GetWeatherResponseT): WeatherStoreT => {
  return {
    fact: {
      now: obj.now,
      lon: obj.info.lon,
      lat: obj.info.lat,
      now_dt: obj.now_dt,
      location: obj.geo_object,
      tzinfo: obj.info.tzinfo.name,
      temp: obj.fact.temp,
      feels_like: obj.fact.feels_like,
      icon: obj.fact.icon,
      condition: obj.fact.condition,
      wind_speed: obj.fact.wind_speed,
      humidity: obj.fact.humidity,
      pressure_mm: obj.fact.pressure_mm,
    },
    forecasts: obj.forecasts.map((forecast) => {
      return {
        date: forecast.date,
        temp_min: forecast.parts.day_short.temp_min,
        temp_max: forecast.parts.day_short.temp,
        temp_avg: Math.round((forecast.parts.day_short.temp + forecast.parts.day_short.temp_min) / 2),
        feels_like: forecast.parts.day_short.feels_like,
        icon: forecast.parts.day_short.icon,
        condition: forecast.parts.day_short.condition,
        wind_speed: forecast.parts.day_short.wind_speed,
        humidity: forecast.parts.day_short.humidity,
        pressure_mm: forecast.parts.day_short.pressure_mm,
      };
    }),
  };
};
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWeatherToList.pending, (state) => {
        state.weatherLoading = true;
      })
      .addCase(addWeatherToList.fulfilled, (state, action) => {
        const weatherListCpy = [...state.weatherList];
        const payload = responseMapper(action.payload);
        weatherListCpy.push({ ...payload, locationId: action.meta.arg.locationId });
        state.weatherList = weatherListCpy;
        state.weatherLoading = false;
      })
      .addCase(addWeatherToList.rejected, (state) => {
        state.weatherLoading = false;
      })
      .addCase(deleteLocation, (state, action) => {
        state.weatherList.filter((weather) => weather.locationId !== action.payload);
      })
      .addCase(addCurrentWeather.pending, (state) => {
        state.weatherLoading = true;
      })
      .addCase(addCurrentWeather.fulfilled, (state, action) => {
        state.geoWeather = responseMapper(action.payload);
        state.weatherLoading = false;
      })
      .addCase(addCurrentWeather.rejected, (state) => {
        state.weatherLoading = false;
      });
  },
});

export const weatherReducer = weatherSlice.reducer;
