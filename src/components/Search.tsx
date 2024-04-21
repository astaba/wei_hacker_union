type SearchProps = {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch, searchTerm }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" value={searchTerm} onChange={onSearch} />
    </div>
  );
};

export default Search;
