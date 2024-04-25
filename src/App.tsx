import React from "react";
import axios from "axios";

import List from "./components/List.tsx";
import { Story } from "./types/constants.ts";
import SearchForm from "./components/SearchForm.tsx";

type AppState = {
  coStates: {
    stories: Story[];
    isLoading: boolean;
    isError: string | null;
  };
  searchTerm: string;
  url: string;
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const getCommentSum = (stories: Story[]): number => {
  const sum = stories.reduce((cumul, story) => cumul + story.num_comments, 0);
  return sum;
};

class App extends React.Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      coStates: {
        stories: [],
        isLoading: false,
        isError: "",
      },
      searchTerm: localStorage.getItem("hackerSearch") || "React",
      url: "",
    };
  }

  componentDidMount(): void {
    this.setState({ url: `${API_ENDPOINT}${this.state.searchTerm}` });
  }

  componentDidUpdate(_prevProps: Record<string, never>, prevState: AppState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      localStorage.setItem("hackerSearch", this.state.searchTerm);
    }
    if (prevState.url !== this.state.url) {
      this.handleFetchStories();
    }
  }

  handleFetchStories = async () => {
    this.setState({
      coStates: { ...this.state.coStates, isLoading: true, isError: "" },
    });
    try {
      const result = await axios.get(this.state.url);
      console.log(result.data);
      this.setState({
        coStates: { stories: result.data.hits, isLoading: false, isError: "" },
      });
    } catch (error) {
      console.log(error);
      this.setState({
        coStates: {
          ...this.state.coStates,
          isLoading: false,
          isError:
            typeof error === "object" &&
            "message" in error! &&
            typeof error.message === "string"
              ? error.message
              : "Something went wrong while fetching stories!",
        },
      });
    }
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value.trim() });
  };

  handleSearchSubmit = () => {
    this.setState({ url: `${API_ENDPOINT}${this.state.searchTerm}` });
  };

  handleDismissStory = (item: Story) => {
    const newStories = this.state.coStates.stories.filter(
      (story) => story.objectID !== item.objectID,
    );
    this.setState((prevState) => {
      return {
        ...prevState,
        coStates: { ...prevState.coStates, stories: newStories },
      };
    });
  };

  render() {
    const { coStates, searchTerm } = this.state;
    const commentSum = getCommentSum(coStates.stories);

    return (
      <div>
        <h1>
          My hacker stories{commentSum ? ` with ${commentSum} comments` : ""}
        </h1>
        <SearchForm
          onSearchSubmit={this.handleSearchSubmit}
          searchTerm={searchTerm}
          onSearchChange={this.handleSearchChange}
        />
        <hr />
        {coStates.isError && <h3>{coStates.isError}</h3>}
        {coStates.isLoading ? (
          <h3>Loading ...</h3>
        ) : (
          <List
            stories={coStates.stories}
            onDismissStory={this.handleDismissStory}
          />
        )}
      </div>
    );
  }
}

export default App;
