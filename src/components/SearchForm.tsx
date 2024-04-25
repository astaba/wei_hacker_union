import React from "react";

type SearchFormProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};

import InputWithLabel from "./InputWithLabel.tsx";

class SearchForm extends React.Component<SearchFormProps> {
  constructor(props: SearchFormProps) {
    super(props);
  }

  render() {
    const { onSearchChange, onSearchSubmit, searchTerm } = this.props;
    return (
      <form onSubmit={onSearchSubmit}>
        <InputWithLabel
          id="search"
          value={searchTerm}
          onSearchChange={onSearchChange}
          isFocused
        >
          <strong>Search: </strong>
        </InputWithLabel>
        <button type="submit" disabled={!searchTerm}>
          Submit
        </button>
      </form>
    );
  }
}

export default SearchForm;
