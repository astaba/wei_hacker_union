import { useCallback, useEffect, useReducer } from "react";

import InputWithLabel from "./components/InputWithLabel.tsx";
import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";

const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";
const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";
const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";
const REMOVE_STORY = "REMOVE_STORY";

const storiesReducer = (
  state: { stories: Story[]; isLoading: boolean; isError: string | boolean },
  action:
    | { type: typeof STORIES_FETCH_INIT }
    | { type: typeof STORIES_FETCH_FAILURE; payload: string }
    | { type: typeof STORIES_FETCH_SUCCESS; payload: Story[] }
    | { type: typeof REMOVE_STORY; payload: Story },
) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return { ...state, isLoading: true, isError: "" };
    case STORIES_FETCH_FAILURE:
      return { ...state, isLoading: false, isError: action.payload };
    case STORIES_FETCH_SUCCESS:
      return { stories: action.payload, isLoading: false, isError: "" };
    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.objectID !== action.payload.objectID,
        ),
      };
    default:
      throw new Error("Unexpected case in reducer action type");
  }
};

const END_POINT = "https://hn.algolia.com/api/v1/search?query=";

function App() {
  const [coStates, dispatchCoStates] = useReducer(storiesReducer, {
    stories: [],
    isLoading: false,
    isError: "",
  });
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item: Story) => {
    dispatchCoStates({ type: REMOVE_STORY, payload: item });
  };

  const handleFetchStories = useCallback(() => {
    if (!searchTerm) return;
    const fetchStories = () => {
      dispatchCoStates({ type: STORIES_FETCH_INIT });
      fetch(`${END_POINT}${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          dispatchCoStates({
            type: STORIES_FETCH_SUCCESS,
            payload: data.hits,
          });
        })
        .catch((error) => {
          dispatchCoStates({
            type: STORIES_FETCH_FAILURE,
            payload: error?.message || "Something went wrong!",
          });
        });
    };
    fetchStories();
  }, [searchTerm]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

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
      {coStates.isError && <h3>{coStates.isError}</h3>}
      {coStates.isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <List stories={coStates.stories} onRemove={handleRemoveStory} />
      )}
    </div>
  );
}

export default App;
