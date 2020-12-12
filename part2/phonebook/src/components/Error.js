import React from 'react'

const Error = ({ message }) => {
    const errorStyle = {
        borderStyle: 'solid',
        borderColor: 'red',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '20px',
        background: '#ffc3c3',
        color: 'red',
    }
    if (message === null){
        return null
    }
    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default Error