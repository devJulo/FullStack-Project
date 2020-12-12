import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Submit from './components/Submit'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'





const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [personsToRender, setPersonsToRender] = useState(persons)
    const [updateMessage, setUpdateMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(persons => {
                setPersons(persons)
                setPersonsToRender(persons)
            })
    }, [])
    
    return (
        <>
            <h2>Phonebook</h2>
            <Error message={errorMessage}/>
            <Notification message={updateMessage}/>
            <Search 
                newSearch={newSearch} 
                setNewSearch={setNewSearch} 
                persons={persons} 
                setPersons={setPersons} 
                newName={newName} 
                setNewName={setNewName} 
                newNumber={newNumber} 
                setNewNumber={setNewNumber} 
                personsToRender={personsToRender} 
                setPersonsToRender={setPersonsToRender}
            />
            <Submit 
                persons={persons} 
                setPersons={setPersons} 
                newName={newName} 
                setNewName={setNewName} 
                newNumber={newNumber} 
                setNewNumber={setNewNumber} 
                personsToRender={personsToRender} 
                setPersonsToRender={setPersonsToRender}
                setUpdateMessage={setUpdateMessage}
                setErrorMessage={setErrorMessage}
            />
            <h2>Numbers</h2>
            <Person 
                personsToRender={personsToRender} 
                persons={persons} 
                setPersonsToRender={setPersonsToRender}
                setPersons={setPersons}
                setNewSearch={setNewSearch}
                setErrorMessage={setErrorMessage}
            />
        </>
    )
}
export default App