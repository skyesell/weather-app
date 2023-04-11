import { GeolocationResT } from "./types";

export const getCurrentLocation = (): Promise<GeolocationResT> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (data) => {
        resolve({ lat: data.coords.latitude, lon: data.coords.longitude });
      },
      (err) => reject(err)
    )
  );
};
