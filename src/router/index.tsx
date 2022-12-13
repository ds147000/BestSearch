import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home";
import Search from "../pages/search";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search/:keyword",
    element: <Search />,
  },
]);
