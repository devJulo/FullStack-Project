import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
        <p>capital {props.country.capital}</p>
        <p>population {props.country.population}</p>
      <h2>languages</h2>
        <ul>
          {props.country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt="country flag" src={props.country.flag}></img>
    </div>
  )
}



const Display = ({ newInput, dataToDisplay, setDataToDisplay }) => {

  const handleClick = (object) => {
      const toDisplay = []
      const buttonName = object.target.id
      toDisplay.push({Country: dataToDisplay.find(element => element.Country.name === buttonName).Country })
      setDataToDisplay(toDisplay)
  }

  if (dataToDisplay.length === 1 && newInput !== '') {
    const country = dataToDisplay[0].Country
    return (
      <Country country={country} />
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
  const [dataToDisplay, setDataToDisplay] = useState([{Country: ''}])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setRawDatas(response.data)
      })
      
  } 
  useEffect(hook, [])

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
      <>
        <Display newInput={newInput} dataToDisplay={dataToDisplay} setDataToDisplay={setDataToDisplay}/>
      </>
    </>
  )
}

export default App;
