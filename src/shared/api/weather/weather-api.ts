import { GetWeatherRequestT, GetWeatherResponseT } from "./types";

export const getWeather = async (data: GetWeatherRequestT): Promise<GetWeatherResponseT> => {
  const mapDataToParams = Object.keys(data).reduce((acc, key, i) => {
    if (i === 0) return `${key}=${data[key]}`;
    return `${acc}&${key}=${data[key]}`;
  }, "");
  const res = await fetch(`http://212.118.54.197:1337/weather?${mapDataToParams}`, {
    method: "GET",
  });
  return await res.json();
};
