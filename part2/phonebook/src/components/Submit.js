import React from 'react'
import Input from './Input'
import Button from './Button'
import personService from '../services/persons'


const Submit = (props) => {

    const addPerson = () => {      
        const personObject = 
        {
            name: props.newName,
            number: props.newNumber,
        }
        personService
            .create(personObject)
            .then(returnedPerson => {
                props.setPersons(props.persons.concat(returnedPerson))
                props.setPersonsToRender(props.persons.concat(returnedPerson))
                props.setNewName('')
                props.setNewNumber('')
            })
            .then(() => {
                props.setUpdateMessage(
                    `${personObject.name}'s number created`
                    )
                    setTimeout(() => {          
                        props.setUpdateMessage(null)        
                    }, 3000)
            })
            .catch(error => {
                props.setErrorMessage(
                    `Information of ${personObject.name} has already been removed from server`
                )
                setTimeout(() => {          
                    props.setErrorMessage(null)        
                }, 5000)
            })
    }

    const updatePerson = id => {
        const person = props.persons.find(p => p.id === id)
        const changePerson = {...person, number: props.newNumber}

        personService
            .update(id, changePerson)
            .then(returnedPerson => {
                props.setPersons(props.persons.map(person => person.id !== id ? person : returnedPerson))
                props.setPersonsToRender(props.personsToRender.map(person => person.id !== id ? person : returnedPerson))
                props.setNewName('')
                props.setNewNumber('')
            })
            .then(() => {
                props.setUpdateMessage(
                    `${person.name}'s number updated`
                    )
                    setTimeout(() => {          
                        props.setUpdateMessage(null)        
                    }, 3000)
            })
            .catch(error => {
                props.setErrorMessage(
                    `Information of ${person.name} has already been removed from server`
                )
                setTimeout(() => {          
                    props.setErrorMessage(null)        
                }, 5000)
            })
    }
    
    const handleNameChange = (event) => {
        props.setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const p = props.persons.find(person => person.name === props.newName)
        if (p) {
            const message = `${props.newName || "name"} is already added to phonebook. Do you want to update the phone number ? `
            if(window.confirm(message)){
                updatePerson(p.id)
            }
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