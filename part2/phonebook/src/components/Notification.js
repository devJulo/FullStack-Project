import React from 'react'


const Notification = ({ message }) => {
    const notificationStyle = {
        borderStyle: 'solid',
        borderColor: 'green',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '20px',
        background: '#92e692',
        color: 'green',
    }

    if (message === null) {
        return null
    }
    return (
        <div style={notificationStyle} >
            {message}
        </div>
    )
}

export default Notification