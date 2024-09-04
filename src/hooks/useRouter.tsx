import {
  createBrowserRouter,
} from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Registration from "../components/Auth/Registration";

export default function useRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />
    },
    {
      path: "/registration",
      element: <Registration />
    }
  ])
  
  return router
}