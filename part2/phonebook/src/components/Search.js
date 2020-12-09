import React from 'react'
import Input from './Input'


const Search = (props) => {
    const handleSearch = (event) => {
        let value = event.target.value
        props.setNewSearch(value)
        const toRender = []
        value = value.toLowerCase()
        if (value === '') {
            props.persons.map(person => toRender.push(person))
        }
        else {
            props.persons.map(person => {
                const regex = new RegExp(`${value}`)
                let name = person.name.toLowerCase()
                if (regex.test(name)){
                    return toRender.push(person)
                }
                else {
                    return toRender
                }
            })
        }
        props.setPersonsToRender(toRender)
    }
    return (
        <>
            <Input value={props.newSearch} handleOnChange={handleSearch} text='filter shown with' />
        </>
    )
}

export default Search