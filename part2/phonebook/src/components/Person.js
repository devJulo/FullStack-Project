import React from 'react'
import Contact from './Contact'

const Person = (props) => {
    return (
        <>
            {props.personsToRender.map(person => 
                <Contact key={person.name} person={person} />
                )}
        </>
    )
}

export default Person