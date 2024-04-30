import React from "react";
import styled from "styled-components";

import InputWithLabel from "./InputWithLabel.tsx";
import StyledButton from "../styled/StyledButton.ts";

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
    <StyledForm onSubmit={onSearchSubmit} className={"search-form"}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onSearchChange={onSearchChange}
        isFocused
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <StyledBtnLarge type="submit" disabled={!searchTerm}>
        Submit
      </StyledBtnLarge>
    </StyledForm>
  );
};

export default SearchForm;

const StyledForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: center;

  * {
    display: block;
  }

  *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledBtnLarge = styled(StyledButton)`
  --pad: 0.5em;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  letter-spacing: 1px;
`;
