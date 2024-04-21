import List from "./components/List.tsx";
import Search from "./components/Search.tsx";
import { list } from "./constants/mock_data.ts";

function App() {
  const stories = list;

  return (
    <div>
      <h1>My hacker stories</h1>
      <Search />
      <hr />
      <List stories={stories} />
    </div>
  );
}

export default App;
