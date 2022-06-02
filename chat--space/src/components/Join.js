import React from 'react'
import '../stylesheets/Join.css'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'

let user;

function Join() {
    const sendUser = () => {
        user = document.getElementById('usernameInput').value;
        user.preventDefault();
    }
    return (

        <div className='join'>
            <div className='join-container'>
                <img src={Logo} alt='logo' />
                <h2>ChatSpace</h2>
                <input placeholder='Enter Your Username' type='text' id='usernameInput' />
                <Link to='/chat'>
                    <button className='join-btn' onClick={sendUser} type='submit'>Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
