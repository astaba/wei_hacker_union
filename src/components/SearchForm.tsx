import React from "react";

import InputWithLabel from "./InputWithLabel.tsx";
import Button from "./Button.tsx";

type InputWithLabelProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (evnt: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm: React.FC<InputWithLabelProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form
      onSubmit={(event) => onSearchSubmit(event)}
      className="mx-auto mb-6 flex flex-col items-center gap-5 sm:flex-row"
    >
      <InputWithLabel
        id="search"
        value={searchTerm}
        onSearchChange={onSearchChange}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <Button
        type="submit"
        disabled={!searchTerm}
        className="btn-large"
      >
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
