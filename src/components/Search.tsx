import React from "react";

type SearchProps = {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch, searchTerm }) => {
  return (
    <>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" value={searchTerm} onChange={onSearch} />
    </>
  );
};

export default Search;
