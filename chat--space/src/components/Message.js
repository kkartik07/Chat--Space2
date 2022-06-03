import React from 'react'
import '../stylesheets/Message.css'

function Message({ user, message, classs }) {
    if (user) {
        return (
            <div className={`message ${classs}`}>
                {`${user}: ${message}`}
            </div>
        )
    }
    else {
        return (
            <div className={`message ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }

}

export default Message
