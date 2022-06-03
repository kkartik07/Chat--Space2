import React, { useEffect } from 'react'
import '../stylesheets/Chat.css'
import { user } from './Join.js'
import socketIO from 'socket.io-client'
import send from '../images/send.png'

const ENDPOINT = 'http://localhost:4500'


function Chat() {

    useEffect(() => {
        const socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            console.log(data.user, data.message)
        })
        socket.on('userJoined', (data) => {
            console.log(data.user, data.message)
        })

        // socket.on('disconnect', function () {
        //     console.log('user Got disconnect!');
        // });
        return () => {
            socket.on('leave', (data) => {
                console.log(data.user, data.message);
                socket.off();
            })
        }
    }, [])

    return (
        <div className='chat'>
            <div className='chat-container'>
                <div className='header'></div>
                <div className='chat-box'></div>
                <div className='input'>
                    <input type='text' className='chat-input' />
                    <button onClick={send} className='send-btn'><img src={send} alt='send' /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat
