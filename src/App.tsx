import { useEffect, useState } from "react";

import InputWithLabel from "./components/InputWithLabel.tsx";
import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";
import { getMockAsyncData } from "./api/getMockAsyncData.ts";

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchStories = () => {
      setIsError("");
      setIsLoading(true);
      getMockAsyncData(true)
        .then((response) => {
          setStories(response.data.stories);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsError(error?.message || "Something went wrong!");
        });
    };
    fetchStories();
  }, []);

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
      {isError && <h3>{isError}</h3>}
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <List stories={searchedStories} onRemove={handleRemoveStory} />
      )}
    </div>
  );
}

export default App;
