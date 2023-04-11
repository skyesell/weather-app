type WeatherConditionT =
  | "clear"
  | "party-cloudy"
  | "cloudy"
  | "overcast"
  | "drizzle"
  | "light-rain"
  | "rain"
  | "moderate-rain"
  | "heavy-rain"
  | "continuous-heavy-rain"
  | "showers"
  | "wet-snow"
  | "light-snow"
  | "snow"
  | "snow-showers"
  | "hail"
  | "thunderstorm"
  | "thunderstorm-with-rain"
  | "thunderstorm-with-hail";

type WeatherFactResponseT = {
  temp: number;
  feels_like: number;
  icon: string;
  condition: string;
  wind_speed: number;
  humidity: number;
  pressure_mm: number;
};

export type GetDayShortResponseT = {
  temp: number;
  temp_min: number;
  wind_speed: number;
  icon: string;
  condition: WeatherConditionT;
  feels_like: number;
  pressure_mm: number;
  humidity: number;
};

export type GetPartsResponseT = {
  day_short: GetDayShortResponseT;
};

export type WeatherForecastResponseT = {
  date: string;
  parts: GetPartsResponseT;
};
export type WeatherForecastStoreT = {
  date: string;
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  feels_like: number;
  icon: string;
  condition: string;
  wind_speed: number;
  humidity: number;
  pressure_mm: number;
};

export type GetWeatherRequestT = {
  [key: string]: string;
  lat: string;
  lon: string;
};

export type GeoObjNameT = {
  name: string;
};
export type GeoObjectResponseT = {
  locality: GeoObjNameT;
  country: GeoObjNameT;
  district: GeoObjNameT;
  province: GeoObjNameT;
};

export type WeatherFactT = WeatherFactResponseT & {
  now: number;
  now_dt: string;
  lon: number;
  lat: number;
  location: GeoObjectResponseT;
  tzinfo: string;
};

export type TzinfoT = {
  name: string;
};
export type GetInfoResponseT = {
  lat: number;
  lon: number;
  tzinfo: TzinfoT;
};
export type GetWeatherResponseT = {
  now: number;
  now_dt: string;
  info: GetInfoResponseT;
  geo_object: GeoObjectResponseT;
  fact: WeatherFactResponseT;
  forecasts: WeatherForecastResponseT[];
};

export type WeatherStoreT = {
  fact: WeatherFactT;
  forecasts: WeatherForecastStoreT[];
};
