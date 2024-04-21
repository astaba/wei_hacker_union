import { useState } from "react";

import List from "./components/List.tsx";
import Search from "./components/Search.tsx";
import { list } from "./constants/mock_data.ts";

function App() {
  const stories = list;
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1>My hacker stories</h1>
      <Search onSearch={handleSearch} />
      <hr />
      <List stories={searchedStories} />
    </div>
  );
}

export default App;
