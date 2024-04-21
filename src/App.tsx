import List from "./components/List.tsx";
import Search from "./components/Search.tsx";

function App() {
  return (
    <div>
      <h1>My hacker stories</h1>
      <Search />
      <hr />
      <List />
    </div>
  );
}

export default App;
