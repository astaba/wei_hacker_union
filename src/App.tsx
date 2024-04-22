import { useState } from "react";

import InputWithLabel from "./components/InputWithLabel.tsx";
import List from "./components/List.tsx";
import { initialList } from "./constants/mock_data.ts";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";

function App() {
  const [stories, setStories] = useState<Story[]>(initialList);
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item: Story) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID,
    );
    setStories(newStories);
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
      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={handleSearch}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <hr />
      <List stories={searchedStories} onRemove={handleRemoveStory} />
    </div>
  );
}

export default App;
