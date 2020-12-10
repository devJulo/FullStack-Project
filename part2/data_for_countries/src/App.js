import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
        <p>capital {props.country.capital}</p>
        <p>population {props.country.population}</p>
      <h2>Spoken languages</h2>
        <ul>
          {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img className="flag" alt="country flag" src={props.country.flag}></img>
      <h2>Weather in {props.country.capital}</h2>
          <p>temperature: {props.weather.current.temperature} °C</p>
          <img className="weather"alt={props.weather.current.weather_descriptions[0]} src={props.weather.current.weather_icons[0]}></img>
          <p>wind: {props.weather.current.wind_speed} km/h direction {props.weather.current.wind_dir}</p>
    </div>
  )
}



const Display = ({ newInput, dataToDisplay, setDataToDisplay, weather }) => {

  const handleClick = (object) => {
      const toDisplay = []
      const buttonName = object.target.id
      toDisplay.push({Country: dataToDisplay.find(element => element.Country.name === buttonName).Country })
      setDataToDisplay(toDisplay)

  }

  if (dataToDisplay.length === 1 && newInput !== '') {
    const country = dataToDisplay[0].Country
    return (
      <Country country={country} weather={weather}/>
    )
  }
  else if (dataToDisplay.length === 0 || newInput === ''){
    return <p>Please provide a valid country</p>
  }
  else if (dataToDisplay.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  else{
    return (
      <div>
        {dataToDisplay.map(data => {
          const button = <button id={data.Country.name} onClick={handleClick}>show</button>
          return (
            <p key={data.Country.name}>
              {data.Country.name} {button}
            </p>
          )}
        )}
        
      </div>

    )
  }
}

const App = () => {
  const [newInput, setNewInput] = useState('')
  const [rawDatas, setRawDatas] = useState()
  const [weather, setWeather] = useState(
    {
      "request": {
          "type": "",
          "query": "",
          "language": "",
          "unit": ""
      },
      "location": {
          "name": "",
          "country": "",
          "region": "",
          "lat": "",
          "lon": "",
          "timezone_id": "",
          "localtime": "",
          "localtime_epoch": "",
          "utc_offset": ""
      },
      "current": {
          "observation_time": "",
          "temperature": "",
          "weather_code": "",
          "weather_icons": [
              ""
          ],
          "weather_descriptions": [
              ""
          ],
          "wind_speed": "",
          "wind_degree": "",
          "wind_dir": "",
          "pressure": "",
          "precip": "",
          "humidity": "",
          "cloudcover": "",
          "feelslike": "",
          "uv_index": "",
          "visibility": "",
          "is_day": ""
      }
  
  })

  const [dataToDisplay, setDataToDisplay] = useState([{Country: {name: ''}}])
  

  const hook_countries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setRawDatas(response.data)
      })
      
  } 
  useEffect(hook_countries, [])

  const hook_weather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    function RemoveAccents(strAccents) {
      var strAccents = strAccents.split('');
      var strAccentsOut = new Array();
      var strAccentsLen = strAccents.length;
      var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
      var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
      for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
          strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
          strAccentsOut[y] = strAccents[y];
      }
      strAccentsOut = strAccentsOut.join('');
      return strAccentsOut;
    }

    if (dataToDisplay.length === 1 && dataToDisplay[0].Country.name !== '') {
      console.log(RemoveAccents(dataToDisplay[0].Country.capital))
      axios.get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${RemoveAccents(dataToDisplay[0].Country.capital)}`)
        .then(response => {
          setWeather(response.data)
        })
    }

  }
  useEffect(hook_weather, [dataToDisplay])
 
  


  const handleOnChange = (event) => {
    const countryToRender = []
    let value = event.target.value

    setNewInput(value)
    value = value.toLowerCase()

    if (value !== ''){
      rawDatas.map(country => {
        const regex = new RegExp(`${value}`)
        let countryName = country.name.toLowerCase()
        if (regex.test(countryName)){
          return countryToRender.push({Country: country})
        }
        else{
          return countryToRender
        }
      })
    }
    setDataToDisplay(countryToRender)
  }

  return (
    <>
      <div>
        <p>find countries :</p>
        <input value={newInput} onChange={handleOnChange}/>
      </div>
      <Display newInput={newInput} dataToDisplay={dataToDisplay} setDataToDisplay={setDataToDisplay} weather={weather}/>
      
    </>
  )
}

export default App;
