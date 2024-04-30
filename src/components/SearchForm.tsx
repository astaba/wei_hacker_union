import React from "react";
import stylex from "@stylexjs/stylex";

import InputWithLabel from "./InputWithLabel.tsx";

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
    <form onSubmit={onSearchSubmit} {...stylex.props(styles.search_form)}>
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
        {...stylex.props(styles.button)}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;

const at_640 = "@media ( min-width:640px )";
const styles = stylex.create({
  search_form: {
    padding: "10px 0 20px 0",
    display: "flex",
    flexDirection: { default: "column", [at_640]: "initial" },
    alignItems: "center",
    gap: { default: "0.5rem", [at_640]: "1rem" },
    margin: "auto 0",
  },

  button: {
    color: { default: null, ":hover": "#FFFFFF" },
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "bold",
    letterSpacing: "1px",
    background: { default: "transparent", ":hover": "#171212" },
    border: "1px solid #171212",
    borderRadius: "3px",
    paddingInline: "1.25em",
    paddingBlock: "0.5em",
    cursor: "pointer",
    transition: "all 0.1s ease-in",
  },
});
