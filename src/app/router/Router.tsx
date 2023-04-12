import { createBrowserRouter } from "react-router-dom";
import { WeatherPage } from "../../pages/WeatherPage";
import { LocationLayout } from "../layouts/LocationLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LocationLayout />,
    children: [
      {
        path: "/weather-app/",
        element: <WeatherPage />,
      },
    ],
  },
]);
