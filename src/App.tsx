import List from "./components/List/List";
import Header from "./components/Header/Header";
import Clients from "./components/Clients/Clients";
import useRouter from "./hooks/useRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  
  const router = useRouter();
  
  return (
    <RouterProvider router={router} />
    // <div className="">
    //   {/* <Header title={"Запись"} /> */}
    //   <Auth />
    //   <div className="d-flex container gap-5">
    //     {/* <List />
    //     <Clients /> */}
    //   </div>
    // </div>
  );
}

export default App;
