import {
  createBrowserRouter,
} from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Registration from "../components/Auth/Registration";
import ControlPage from "../components/ControlPage/ControlPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function useRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />
    },
    {
      path: "/registration",
      element: <Registration />
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [{
        path: "/control",
        element: <ControlPage />
      }
      ]
    }
  ])

  return router
}