import React, { useEffect, useState, useRef } from 'react'
import '../stylesheets/Chat.css'
import { user } from './Join.js'
import socketIO from 'socket.io-client'
import sendLogo from '../images/send.png'
import closeIcon from '../images/closeIcon.png'
import Message from './Message'
import ScrollToBottom from 'react-scroll-to-bottom'
import Picker from 'emoji-picker-react'

const ENDPOINT = 'https://chat-spacee.herokuapp.com/'

let socket;
function Chat() {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInput(input => input + emojiObject.emoji);
        setShowPicker(false);
    };

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        setInput("");
    }

    //////////////////////////


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


        // return () => {
        // socket.on('leave', (data) => {
        //     setMessages([...messages, data]);
        //     socket.off();
        // })
        // }

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
            <div className='header'>
                <h2>ChatSpace</h2>
                <a href='/'> <img src={closeIcon} alt='close' /></a>
            </div>

            <div className='chat-body'>

                <ScrollToBottom className='chat-box'>
                    {messages.map((item) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ScrollToBottom>


            </div >

            {/* //////////// */}


            {/* ////////////////// */}

            <div className="picker-container">
                <img
                    className="emoji-icon"
                    src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                    onClick={() => setShowPicker(val => !val)}
                    alt='emoji-icon' />
                {showPicker && <Picker
                    onEmojiClick={onEmojiClick}
                    className='picker'
                />}

                <input
                    className="input-style"
                    value={input}
                    onKeyPress={(evt => evt.key === 'Enter' ? send() : null)}
                    onChange={e => { setInput(e.target.value); }}
                    type='text' id='chatInput'
                />
                <button onClick={send} className='send-btn'><img src={sendLogo} alt='send' /></button>
            </div>

        </div >


    )
}

export default Chat;
