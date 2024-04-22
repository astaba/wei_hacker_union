import InputWithLabel from "./components/InputWithLabel.tsx";
import List from "./components/List.tsx";
import { list } from "./constants/mock_data.ts";
import useLocalStorage from "./hooks/useLocalStorage.tsx";

function App() {
  const stories = list;
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(
    (
      (searchTerm: string) => (story) =>
        !searchTerm ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )(searchTerm),
  );

  return (
    <div>
      <h1>My hacker stories</h1>
      <InputWithLabel id="search" value={searchTerm} onChange={handleSearch}>
        <strong>Search: </strong>
      </InputWithLabel>
      <hr />
      <List stories={searchedStories} />
    </div>
  );
}

export default App;
