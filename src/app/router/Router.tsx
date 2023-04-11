import { createBrowserRouter } from "react-router-dom";
import { WeatherPage } from "../../pages/WeatherPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <WeatherPage />,
      },
      {
        path: "/:locationId",
        element: <WeatherPage />,
      },
    ],
  },
]);
