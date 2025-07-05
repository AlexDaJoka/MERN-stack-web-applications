import {React, useEffect, useContext, useState} from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom'
import io from 'socket.io-client'


function CurrentEvent() {

  const url = window.location.href.slice(35);

  const {currentUser} = useContext(AuthContext)

  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/events/${url}`)
    .then(events => setEvents(events.data))
    .catch(err => console.log(err))
  }, [])









//Messages






const handleEditMessage = async (e) => {

  const formData = new FormData(e.target)

  const message = formData.get('message')
  const messageID = document.getElementById('messageID').value
  const messageAuthor = document.getElementById('messageAuthor').value

  try{
    await axios.patch(`http://localhost:8000/messages/${messageID}`, {
      messageAuthor,
      message
    });
  }catch(err){
    console.log(err)
  }

}









const handleDeleteMessage = async () =>{
  

  const messageID = document.getElementById('messageID').value



  try{
    await axios.delete(`http://localhost:8000/messages/${messageID}`)
  }catch(err){
    console.log(err)
  }

}



  const [messages, setMessage] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/messages/')
    .then(messages => setMessage(messages.data))
    .catch(err => console.log(err))
  }, [])






const handleSendMessage = async (e) => {

  e.preventDefault()

  const formData = new FormData(e.target)

  const message = formData.get('message')

  try{
    await axios.post(`http://localhost:8000/messages/${currentUser._id}`, {
      message
    })
    e.target.reset();

  }catch(err){
    console.log(err)
  }

}


  return (
    <>
    <form>
          <p>{events.eventName}</p>
          <p>{events.eventTime}</p>
          <p>{events.eventTipe}</p>
          <p>{events.eventAgeGroup}</p>
          <p>{events.eventFreeOrPay}</p>
          <p>{events.eventPlace}</p>
          <p>{events.eventDescription}</p>
          <p>{events.eventAuthorEmail}</p>
          <p>{events.eventAuthorPhone}</p>
          <Link to={'/allEvents'}>Go back</Link>
    </form>

<form onSubmit={handleSendMessage}>
<textarea name="message"></textarea>
<button>Send</button>
</form>



<section>
{messages.map(message => {
  return(
    <>
<input id='messageID' type='hidden' defaultValue={message._id}/> 
<input name='messageAuthor' id='messageAuthor' type='hidden' value={message.messageAuthor}/> 
  <p>{message.messageAuthor}:</p>
  <p>{message.message}</p>


  </>
  )
})}
</section>



<section>
{messages.map(message => {
  if(message.messageAuthor === currentUser.username){
return(
<>

<button onClick={handleDeleteMessage}>Delete</button>
      <form onSubmit={handleEditMessage}>
       <input name='message' defaultValue={message.message}/>
       <button>Edit</button>
      </form> 

</>
)

}

})}
</section>






</>
  )
}


export default CurrentEvent