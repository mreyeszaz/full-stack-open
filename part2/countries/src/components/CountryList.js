import Country from "./Country";

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((c) => (
        <Country country={c} />
      ))}
    </div>
  );
};

export default CountryList;
