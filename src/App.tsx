import { ModalProvider } from "./hooks/useModal";
import useRouter from "./hooks/useRouter";
import { RouterProvider } from "react-router-dom";

function App() {

  const router = useRouter();

  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}

export default App;
