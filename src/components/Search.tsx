type SearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" onChange={onSearch} />
    </div>
  );
};

export default Search;
