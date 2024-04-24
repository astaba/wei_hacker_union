import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";

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

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

function App() {
  const [coStates, dispatchCoStates] = useReducer(storiesReducer, {
    stories: [],
    isLoading: false,
    isError: "",
  });
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleRemoveStory = (item: Story) => {
    dispatchCoStates({ type: REMOVE_STORY, payload: item });
  };

  const handleFetchStories = useCallback(async () => {
    // Now the "disabled" attribute of the search button play this role
    // if (!url) return;
    dispatchCoStates({ type: STORIES_FETCH_INIT });
    try {
      const result = await axios.get(url);
      dispatchCoStates({
        type: STORIES_FETCH_SUCCESS,
        payload: result.data.hits,
      });
    } catch (error) {
      console.log(error);
      dispatchCoStates({
        type: STORIES_FETCH_FAILURE,
        payload: "Something went wrong while fetching stories!",
      });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <div>
      <h1>My hacker stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
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
