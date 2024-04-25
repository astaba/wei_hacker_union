import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios";

import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";
import SearchForm from "./components/SearchForm.tsx";

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

const getCommentSum = (stories: Story[]): number => {
  // console.log("C: get comment sum");
  // Delayer
  // let i = 0;
  // while (i < 1000000000) i++;
  // function purpose
  const sum = stories.reduce((cumul, story) => cumul + story.num_comments, 0);
  return sum;
};

function App() {
  // console.log("B: App");
  const [coStates, dispatchCoStates] = useReducer(storiesReducer, {
    stories: [],
    isLoading: false,
    isError: "",
  });
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  // Optimization in place of: const commentSum = getCommentSum(coStates.stories)
  const commentSum = useMemo(() => {
    return getCommentSum(coStates.stories);
  }, [coStates]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value.trim());
    },
    [setSearchTerm],
  );

  const handleSearchSubmit = useCallback(() => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }, [searchTerm]);

  const handleDismissStory = useCallback((item: Story) => {
    dispatchCoStates({ type: REMOVE_STORY, payload: item });
  }, []);

  const handleFetchStories = useCallback(async () => {
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
      <h1>
        My hacker stories{commentSum ? ` with ${commentSum} comments` : ""}
      </h1>
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <hr />
      {coStates.isError && <h3>{coStates.isError}</h3>}
      {coStates.isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <List stories={coStates.stories} onDismissStory={handleDismissStory} />
      )}
    </div>
  );
}

export default App;
