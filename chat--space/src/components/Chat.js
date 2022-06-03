import React, { useEffect, useState } from 'react'
import '../stylesheets/Chat.css'
import { user } from './Join.js'
import socketIO from 'socket.io-client'
import sendLogo from '../images/send.png'
import Message from './Message'

const ENDPOINT = 'http://localhost:4500'

let socket;
function Chat() {
    const [id, setId] = useState("");
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";

    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on('connect', () => {
            console.log('connected')
            setId(socket.id)
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

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            console.log(`${data.user} messaged ${data.message}`)
        })
        return () => {

        }
    }, [])

    return (
        <div className='chat'>
            <div className='chat-container'>
                <div className='header'></div>
                <div className='chat-box'>
                    <Message message={'hhhhhhhhhhhh'} />
                </div>
                <div className='input'>
                    <input type='text' id='chatInput' />
                    <button onClick={send} className='send-btn'><img src={sendLogo} alt='send' /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat
