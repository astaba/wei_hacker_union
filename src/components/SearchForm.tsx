import React from "react";

type InputWithLabelProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};

import InputWithLabel from "./InputWithLabel.tsx";

const SearchForm: React.FC<InputWithLabelProps> = React.memo(
  ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    console.log("D: SearchForm renders");

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
  },
);
export default SearchForm;
