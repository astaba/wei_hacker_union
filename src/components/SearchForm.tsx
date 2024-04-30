import React from "react";

import InputWithLabel from "./InputWithLabel.tsx";
import Button from "./Button.tsx";
import srchStyles from "./SearchForm.module.css";
import btnStyles from "./Button.module.css";

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
    <form onSubmit={onSearchSubmit} className={srchStyles["search-form"]}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onSearchChange={onSearchChange}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <Button type="submit" disabled={!searchTerm} btnClasses={btnStyles.button_large}>
        Submit
      </Button>
    </form>
  );
};

export default SearchForm;
