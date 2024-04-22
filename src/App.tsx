import { useEffect, useReducer, useState } from "react";

import InputWithLabel from "./components/InputWithLabel.tsx";
import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";
import { getMockAsyncData } from "./api/getMockAsyncData.ts";

const SET_STORIES = "SET_STORIES";
const REMOVE_STORY = "REMOVE_STORY";

const storiesReducer = (
  state: Story[],
  action:
    | { type: typeof SET_STORIES; payload: Story[] }
    | { type: typeof REMOVE_STORY; payload: Story },
) => {
  switch (action.type) {
    case SET_STORIES:
      return action.payload;
    case REMOVE_STORY:
      return state.filter(
        (story) => story.objectID !== action.payload.objectID,
      );
    default:
      throw new Error("Unexpected case in reducer action type");
  }
};

function App() {
  const [stories, dispatchStories] = useReducer(storiesReducer, []);
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item: Story) => {
    dispatchStories({ type: REMOVE_STORY, payload: item });
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
      getMockAsyncData(false)
        .then((response) => {
          dispatchStories({
            type: SET_STORIES,
            payload: response.data.stories,
          });
        })
        .catch((error) => {
          setIsError(error?.message || "Something went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
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
