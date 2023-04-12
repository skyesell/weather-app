import { createBrowserRouter } from "react-router-dom";
import { WeatherPage } from "../../pages/WeatherPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/weather-app/",
        element: <WeatherPage />,
      },
      {
        path: "weather-app/:locationId",
        element: <WeatherPage />,
      },
    ],
  },
]);
