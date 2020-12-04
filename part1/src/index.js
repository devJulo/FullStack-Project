import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Feel free to give your feed back about this app</h3>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h3>statiscs</h3>
      <p>good {good}</p> 
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)



