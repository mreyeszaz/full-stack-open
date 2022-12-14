const SearchBar = ({ country, handleCountryChange }) => {
  return (
    <form>
      <div>
        Find countries: <input value={country} onChange={handleCountryChange} />
      </div>
    </form>
  );
};

export default SearchBar;