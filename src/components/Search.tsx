import { useState } from "react";

type SearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
};

export default Search;
