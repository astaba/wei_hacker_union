const Search = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>&nbsp;
      <input id="search" type="text" onChange={handleChange} />
    </div>
  );
};

export default Search;
