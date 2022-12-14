import axios from "axios";
import { useEffect, useState } from "react";
import Results from "./components/Results";
import Searchbar from "./components/Searchbar";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  console.log("countries", countries);
  console.log('LENGTH', countries.length)
  const handleCountryChange = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
  };

  return (
    <div>
      <Searchbar country={country} handleCountryChange={handleCountryChange} />
      <Results country={country} countries={countries} />
    </div>
  );
};

export default App;
