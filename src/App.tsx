import axios from "axios";
import { useEffect, useState } from "react";
import Auth from "./components/Auth/Auth";

function App() {

  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/").then(response => {
        setData(response.data);
    })
  })

  return (
    <div className="">
      <Auth />
    </div>
  );
}

export default App;
