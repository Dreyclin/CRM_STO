import {
  createBrowserRouter,
} from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Registration from "../components/Auth/Registration";
import Clients from "../components/Clients/Clients";
import List from "../components/List/List";

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
      path: "/clients",
      element: <List />
    }
  ])
  
  return router
}