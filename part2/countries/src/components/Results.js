import CountryList from "./CountryList";
import Country from "./Country";

const Results = ({ country, countries }) => {
  const countryResults = countries.filter((c) => c.name.official.toLowerCase().includes(country.toLowerCase()));
  const tooManyCountries = countryResults.length > 10;
  const oneCountry = countryResults.length === 1;
  const moreThanOneCountry = !tooManyCountries && !oneCountry;

  return (
    <div>
      {tooManyCountries && <p>Too many matches, specify another filter</p>}
      {moreThanOneCountry && <CountryList countries={countryResults} />}
      {oneCountry && <Country country={countryResults[0]} />}
    </div>
  );
};

export default Results
