import List from "./components/List/List";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="">
      <Header title={"Запись"} />
      <div className="d-flex justify-content-between">
        <List />
        <div className="container w-50">
          <div className="btn-group">
            <button className="btn btn-primary active">Active</button>
            <button className="btn btn-primary">Non Active</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
