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
    <form
      onSubmit={onSearchSubmit}
      className="flex flex-col items-baseline gap-5 mx-auto mb-6 sm:flex-row"
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
        btnClasses={"tracking-[1px] font-bold px-3.5 py-1"}
      >
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
