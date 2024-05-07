import React from "react";
import { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";

import List from "./components/List.tsx";
import useLocalStorage from "./hooks/useLocalStorage.tsx";
import { Story } from "./types/constants.ts";
import SearchForm from "./components/SearchForm.tsx";
import LastSearches from "./components/LastSearches.tsx";
import Button from "./components/Button.tsx";

const STORIES_FETCH_INIT = "STORIES_FETCH_INIT";
const STORIES_FETCH_SUCCESS = "STORIES_FETCH_SUCCESS";
const STORIES_FETCH_FAILURE = "STORIES_FETCH_FAILURE";
const REMOVE_STORY = "REMOVE_STORY";

const storiesReducer = (
  state: {
    stories: Story[];
    isLoading: boolean;
    isError: string | boolean;
    page: number;
  },
  action:
    | { type: typeof STORIES_FETCH_INIT }
    | { type: typeof STORIES_FETCH_FAILURE; payload: string }
    | {
      type: typeof STORIES_FETCH_SUCCESS;
      payload: { hits: Story[]; page: number };
    }
    | { type: typeof REMOVE_STORY; payload: Story },
) => {
  switch (action.type) {
    case STORIES_FETCH_INIT:
      return { ...state, isLoading: true, isError: "" };
    case STORIES_FETCH_FAILURE:
      return { ...state, isLoading: false, isError: action.payload };
    case STORIES_FETCH_SUCCESS:
      return {
        stories:
          action.payload.page === 0
            ? action.payload.hits
            : state.stories.concat(action.payload.hits),
        isLoading: false,
        isError: "",
        page: action.payload.page,
      };
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

const getCommentSum = (stories: Story[]): number => {
  const sum = stories.reduce((cumul, story) => {
    const num_comments = story.num_comments ? story.num_comments : 0;
    //console.log(num_comments);
    return cumul + num_comments;
  }, 0);
  return sum;
};

const getUrl = ({
  query,
  hitsPerPage = 20,
  page = 0,
}: {
  query: string;
  hitsPerPage?: number;
  page?: number;
}) => {
  const API_BASE = "https://hn.algolia.com/api/v1";
  const API_SEARCH = "/search";
  const API_ENDPOINT = new URL(`${API_BASE}${API_SEARCH}`);
  if (query) API_ENDPOINT.searchParams.set("query", query);
  if (hitsPerPage)
    API_ENDPOINT.searchParams.set("hitsPerPage", hitsPerPage.toString());
  if (page) API_ENDPOINT.searchParams.set("page", page.toString());
  return API_ENDPOINT.href;
};

const getLastSearches = (urls: string[]) => {
  return urls
    .reduce<string[]>((cumul, url, index) => {
      const searchTerm = new URL(url).searchParams.get("query") as string;
      if (index === 0) return cumul.concat(searchTerm);
      const prevConcat = cumul[cumul.length - 1];
      if (searchTerm === prevConcat) return cumul;
      else return cumul.concat(searchTerm);
    }, [])
    .slice(-6, -1);
};

function App() {
  const [coStates, dispatchCoStates] = useReducer(storiesReducer, {
    stories: [],
    isLoading: false,
    isError: "",
    page: 0,
  });
  const commentSum = getCommentSum(coStates.stories);

  const [searchTerm, setSearchTerm] = useLocalStorage("hackerSearch", "React");
  const [urls, setUrls] = useState([getUrl({ query: searchTerm })]);
  const lastSearches = getLastSearches(urls);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUrl = getUrl({ query: searchTerm, page: 0 });
    setUrls(urls.concat(newUrl));
  };

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const newUrl = getUrl({ query: searchTerm, page: 0 });
    setUrls(urls.concat(newUrl));
  };

  const handleMore = () => {
    const newUrl = getUrl({ query: searchTerm, page: coStates.page + 1 });
    setUrls(urls.concat(newUrl));
  };

  const handleDismissStory = (item: Story) => {
    dispatchCoStates({ type: REMOVE_STORY, payload: item });
  };

  const handleFetchStories = useCallback(async () => {
    dispatchCoStates({ type: STORIES_FETCH_INIT });
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      console.log(result.data);
      dispatchCoStates({
        type: STORIES_FETCH_SUCCESS,
        payload: { hits: result.data.hits, page: result.data.page },
      });
    } catch (error) {
      console.log(error);
      dispatchCoStates({
        type: STORIES_FETCH_FAILURE,
        payload: "Something went wrong while fetching stories!",
      });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <div className="flex min-h-screen flex-col bg-[#83A4D4] bg-gradient-to-l from-[#B6FBFF] to-[#83A4D4] px-8 py-12 text-[#171212]">
      <h1 className="mb-6 text-center text-5xl font-light tracking-wide">
        My hacker stories{commentSum ? ` with ${commentSum} comments` : ""}
      </h1>
      <SearchForm
        onSearchSubmit={handleSearchSubmit}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />
      <hr />
      {coStates.isError && <h3>{coStates.isError}</h3>}
      <List stories={coStates.stories} onDismissStory={handleDismissStory} />
      <div className="my-6 flex items-center justify-center">
        {coStates.isLoading ? (
          <h3 className="font-bold">Loading ...</h3>
        ) : (
          <Button onClick={handleMore} className="btn-large">
            More
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
