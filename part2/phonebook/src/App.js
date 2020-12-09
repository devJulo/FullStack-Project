import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Submit from './components/Submit'
import Person from './components/Person'
import axios from 'axios'



const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ newSearch, setNewSearch ] = useState('')
    const [ personsToRender, setPersonsToRender] = useState(persons)

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
                setPersonsToRender(response.data)
            })
    }
    useEffect(hook, [])
    
    return (
        <>
            <h2>Phonebook</h2>
            <Search newSearch={newSearch} setNewSearch={setNewSearch} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} personsToRender={personsToRender} setPersonsToRender={setPersonsToRender}/>
            <Submit persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} personsToRender={personsToRender} setPersonsToRender={setPersonsToRender}/>
            <h2>Numbers</h2>
            <Person personsToRender={personsToRender} />
        </>
    )
}
export default App