import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Router";
import { useEffect } from "react";
import { createLocation, getWeatherByCurrentLocation } from "./shared/actions";
import { useAppDispatch } from "./app/store/store";
import "./globals.css";
import { init } from "./entities/location/model";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWeatherByCurrentLocation());
    dispatch(createLocation);
    dispatch(init());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
