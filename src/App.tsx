import React from "react";
import axios from "axios";

import List from "./components/List.tsx";
import { Story } from "./types/constants.ts";
import SearchForm from "./components/SearchForm.tsx";
import withLocalStorage from "./reusable-HOC/withLocalStorage.tsx";

type AppState = {
  coStates: {
    stories: Story[];
    isLoading: boolean;
    isError: string | null;
  };
  url: string;
};

interface AppProps {
  storageValue: string;
  setStorageValue: (value: string) => void;
}

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const getCommentSum = (stories: Story[]): number => {
  const sum = stories.reduce((cumul, story) => cumul + story.num_comments, 0);
  return sum;
};

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      coStates: {
        stories: [],
        isLoading: false,
        isError: "",
      },
      url: "",
    };
  }

  componentDidMount(): void {
    this.setState({ url: `${API_ENDPOINT}${this.props.storageValue}` });
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (prevProps.storageValue !== this.props.storageValue) {
      localStorage.setItem("hackerSearch", this.props.storageValue);
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
    this.props.setStorageValue(event.target.value);
  };

  handleSearchSubmit = () => {
    this.setState({ url: `${API_ENDPOINT}${this.props.storageValue}` });
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
    const { coStates } = this.state;
    const commentSum = getCommentSum(coStates.stories);

    return (
      <div>
        <h1>
          My hacker stories{commentSum ? ` with ${commentSum} comments` : ""}
        </h1>
        <SearchForm
          onSearchSubmit={this.handleSearchSubmit}
          searchTerm={this.props.storageValue}
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

const App = withLocalStorage(_App, {
  defaultValue: "React",
  storageKey: "hackerSearch",
});

export default App;
