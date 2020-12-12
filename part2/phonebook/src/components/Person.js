import React from 'react'
import Contact from './Contact'
import personService from '../services/persons'

const Person = (props) => {
    
    const handleDeleteOf = id => {
        const person = props.persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name} ?`)){
        personService
            .delt(id, person)
            .then(personsReturned => {
                props.setPersonsToRender(personsReturned)
                props.setPersons(personsReturned)
                props.setNewSearch('')
            })
            .catch(error => {
                props.setErrorMessage(
                    `Information of ${person.name} has already been removed from server`
                )
                setTimeout(() => {          
                    props.setErrorMessage(null)        
                }, 5000)
                props.setPersons(props.persons.filter(p => p.id !== id))
                props.setPersonsToRender(props.personsToRender.filter(p => p.id !== id))
            })
        }

    }
    return (
        <>
            {props.personsToRender.map(person => 
                <Contact key={person.name} person={person} handleDelete={() => handleDeleteOf(person.id)} />
                )}
        </>
    )
}

export default Person