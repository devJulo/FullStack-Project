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