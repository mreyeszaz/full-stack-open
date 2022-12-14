import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [weatherIcon, setWeatherIcon] = useState({});

  const [lat, lon] = country.latlng;
  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
      )
      .then((res) => {
        console.log(res);
        setTemp(res.data.main.temp);
        setWind(res.data.wind.speed);
        return res.data.weather[0].icon
      })
      .then( res => {
        return axios.get(`http://openweathermap.org/img/wn/${res}@2x.png`)

      }).then(res => {
        setWeatherIcon(res);
      });
  });


  const handleShowClick = () => {
    setIsShowing(!isShowing);
  };

  return isShowing ? (
    <div>
      <h1>{country.name.official}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <div>
        <strong>languages:</strong>
        <ul>
          {Object.values(country.languages).map((l) => (
            <li>{l}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt="country flag" />
      </div>
      <div>
        <strong>Weather in {country.capital[0]}</strong>
        <p>temperature {temp}F</p>
        <p>wind {wind}mph</p>
      </div>
    </div>
  ) : (
    <p>
      {country.name.official + " "}
      <button onClick={handleShowClick}>show</button>
    </p>
  );
};

export default Country;
