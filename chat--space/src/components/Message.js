import React from 'react'
import '../stylesheets/Message.css'

function Message({ message }) {
    return (
        <>
            <div className='message right'>
                {message}
            </div>
            <div className='message left'>
                {message}
            </div>
        </>
    )
}

export default Message
