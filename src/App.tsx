import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { router } from "./app/router/Router";
import { createLocation, getWeatherByCurrentLocation } from "./shared/actions";
import { useAppDispatch } from "./app/store/store";
import { init } from "./entities/location/model";
import "./globals.css";

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
