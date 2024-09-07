import {
  createBrowserRouter,
} from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Registration from "../components/Auth/Registration";
import ControlPage from "../components/ControlPage/ControlPage";

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
<<<<<<< HEAD
      path: "/control",
      element: <ControlPage /> // Вложенные маршруты будут защищены
=======
      path: "/",
      element: <ProtectedRoute />,
      children: [{
        path: "/control",
        element: <ControlPage />
      }
      ]
>>>>>>> cae365874edba02897930e786b56539144be80bb
    }
  ])

  return router
}