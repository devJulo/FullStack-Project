import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  if (text === "good"){
    return (
      <>
        <td>{text}</td>   
        <td>{value[0]}</td>
      </>
    )
  }
  else if (text === "neutral"){
    return (
      <>
        <td>{text}</td> 
        <td>{value[1]}</td>
      </>
    )
  }
  else if (text === "bad"){
    return (
      <>
        <td>{text}</td> 
        <td>{value[2]}</td>
      </>
    )
  }
  else if (text === "all"){
    return (
      <>
        <td>{text}</td> 
        <td>{value[0] + value[1] + value[2]}</td>
      </>
    )
  }
  else if (text === "average"){
    return (
      <>
        <td>{text}</td> 
        <td>{(value[0] - value[2]) / (value[0] + value[1] + value[2])}</td>
      </>
    )
  }
  else if (text === "positive"){
    return (
      <>
        <td>{text}</td> 
        <td>{value[0] / (value[0] + value[1] + value[2]) * 100} %</td>
      </>
    )
  }
}

const Statistics = ({good, bad, neutral}) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <tr><Statistic text="good" value = {[good, neutral, bad]} /></tr>
          <tr><Statistic text="neutral" value = {[good, neutral, bad]} /></tr>
          <tr><Statistic text="bad" value = {[good, neutral, bad]} /></tr>
          <tr><Statistic text="all" value = {[good, neutral, bad]} /></tr>
          <tr><Statistic text="average" value = {[good, neutral, bad]} /></tr>
          <tr><Statistic text="positive" value = {[good, neutral, bad]} /></tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad+ 1)

  return (
    <>
      <h3>Give feedback</h3>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <h3>Statistics</h3>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)



