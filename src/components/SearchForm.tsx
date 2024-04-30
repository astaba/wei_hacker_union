import React from "react";

import InputWithLabel from "./InputWithLabel.tsx";
import Button from "./Button.tsx";

type InputWithLabelProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};

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
      <Button type="submit" disabled={!searchTerm} btnClasses={"button_large"}>
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
