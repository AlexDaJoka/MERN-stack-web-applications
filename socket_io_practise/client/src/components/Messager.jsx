import React, { useEffect, useContext, useState } from 'react'
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';
import axios from 'axios';



function Messager() {

  const socket = io.connect('http://localhost:8000');

  const {updateUser, currentUser} = useContext(AuthContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/messages`)
    .then(messages => setMessages(messages.data))
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
    })
  })

  return (
    (messages.map(message => {
      return(
        <form>

<p>{message.message}</p>

        </form>
      )
    }))
  )
}

export default Messager