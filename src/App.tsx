import List from "./components/List.tsx";
import Search from "./components/Search.tsx";
import { list } from "./constants/mock_data.ts";

function App() {
  const stories = list;
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`From App component: ${event.target.value}`)
  }

  return (
    <div>
      <h1>My hacker stories</h1>
      <Search onSearch={handleSearch}/>
      <hr />
      <List stories={stories} />
    </div>
  );
}

export default App;
