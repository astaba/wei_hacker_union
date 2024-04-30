import React from "react";
import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";
import SearchForm from "./components/SearchForm.tsx";
//import "./App.css";

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
  const sum = stories.reduce((cumul, story) => {
    const num_comments = story.num_comments ? story.num_comments : 0;
    //console.log(num_comments);
    return cumul + num_comments;
  }, 0);
  return sum;
};

function App() {
  const [coStates, dispatchCoStates] = useReducer(storiesReducer, {
    stories: [],
    isLoading: false,
    isError: "",
  });
  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const commentSum = getCommentSum(coStates.stories);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleDismissStory = (item: Story) => {
    dispatchCoStates({ type: REMOVE_STORY, payload: item });
  };

  const handleFetchStories = useCallback(async () => {
    dispatchCoStates({ type: STORIES_FETCH_INIT });
    try {
      const result = await axios.get(url);
      console.log(result.data);
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
    <StyledContainer className={"container"}>
      <StyledHeadline className={"headline-primary"}>
        My hacker stories{commentSum ? ` with ${commentSum} comments` : ""}
      </StyledHeadline>
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
    </StyledContainer>
  );
}

export default App;

const StyledContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;
`;

const StyledHeadline = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;
