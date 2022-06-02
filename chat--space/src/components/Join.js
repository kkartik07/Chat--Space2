import React, { useState } from 'react'
import '../stylesheets/Join.css'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'

let user;

function Join() {
    const sendUser = () => {
        user = document.getElementById('usernameInput').value;
        document.getElementById('usernameInput').value = "";
    }

    const [name, setName] = useState("");
    return (

        <div className='join'>
            <div className='join-container'>
                <img src={Logo} alt='logo' />
                <h2>ChatSpace</h2>
                <input onChange={(e) => setName(e.target.value)} placeholder='Enter Your Username' type='text' id='usernameInput' />
                <Link to='/chat' onClick={(evt) => name ? null : evt.preventDefault()}>
                    <button className='join-btn' onClick={sendUser} type='submit'>Join</button>
                </Link>
            </div>
        </div>
    )
}

export { user };
export default Join
