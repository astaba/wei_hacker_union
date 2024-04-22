import List from "./components/List.tsx";
import Search from "./components/Search.tsx";
import { list } from "./constants/mock_data.ts";
import useLocalStorage from "./hooks/useLocalStorage.tsx";

function App() {
  const stories = list;
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(((searchTerm: string) => (story) =>
      !searchTerm || story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )(searchTerm),
  );

  return (
    <div>
      <h1>My hacker stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />
      <hr />
      <List stories={searchedStories} />
    </div>
  );
}

export default App;
