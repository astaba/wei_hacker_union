import React from "react";

type InputWithLabelProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};

import InputWithLabel from "./InputWithLabel.tsx";

const SearchForm: React.FC<InputWithLabelProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form onSubmit={onSearchSubmit} className={"search-form"}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onSearchChange={onSearchChange}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
        className={"button button_large"}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
