import List from "./components/List/List";
import Header from "./components/Header/Header";
import Clients from "./components/Clients/Clients";

function App() {
  return (
    <div className="">
      <Header title={"Клиенты"} />
      <div className="d-flex container gap-5">
        <List />
        <Clients />
      </div>
    </div>
  );
}

export default App;
