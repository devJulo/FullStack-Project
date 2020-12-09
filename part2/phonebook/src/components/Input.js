import React from 'react'

const Input = ({ text, value, handleOnChange }) => <div>{text} <input value={value} onChange={handleOnChange}/></div>

export default Input