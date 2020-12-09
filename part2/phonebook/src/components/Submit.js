import React from 'react'
import Input from './Input'
import Button from './Button'


const Submit = (props) => {

    const addPerson = () => {      
        const personObject = 
        {
            name: props.newName,
            number: props.newNumber,
        }
        const newPerson = props.persons.concat(personObject)
        props.setPersons(newPerson)
        props.setPersonsToRender(newPerson)
        props.setNewName('')
        props.setNewNumber('')
    }

    
    const handleNameChange = (event) => {
        props.setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (props.persons.find(person => person.name === props.newName)) {
            alert(`${props.newName || "name"} or ${props.newNumber || "phone number"} is already added to phonebook `)
        }
        else if (props.newName === '' || props.newNumber === ''){
            alert(`please provide a name and a phone number`)
        }
        else {
            addPerson()
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>add a new contact</h2>
                <Input value={props.newName} handleOnChange={handleNameChange} text='name' />
                <Input value={props.newNumber} handleOnChange={handleNumberChange} text='number' />
                <Button type='type' text='add' />
            </form>
        </>
    )
}

export default Submit