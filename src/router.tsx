import { createBrowserRouter } from "react-router-dom";
import NavBar from "./components/nav-bar";
import App from "./App";
import UserFrom from "./routes/user-from";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserFrom />,

  },
]);

export default router;
