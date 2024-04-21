type SearchProps = {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = (props) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>&nbsp;
      <input
        id="search"
        type="text"
        value={props.searchTerm}
        onChange={props.onSearch}
      />
    </div>
  );
};

export default Search;
