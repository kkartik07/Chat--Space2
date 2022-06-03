import React, { useEffect, useState } from 'react'
import '../stylesheets/Chat.css'
import { user } from './Join.js'
import socketIO from 'socket.io-client'
import sendLogo from '../images/send.png'
import Message from './Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = 'http://localhost:4500'

let socket;
function Chat() {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([])
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
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })
        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })


        return () => {
            // socket.on('leave', (data) => {
            //     setMessages([...messages, data]);
            //     socket.off();
            // })
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(`${data.user} messaged ${data.message}`)
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className='chat'>
            <div className='chat-container'>
                <div className='header'></div>
                <ReactScrollToBottom className='chat-box'>
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className='input'>
                    <input type='text' id='chatInput' />
                    <button onClick={send} className='send-btn'><img src={sendLogo} alt='send' /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat
