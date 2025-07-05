import {React, useState, useContext, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from './AuthContext'

function YourEvents() {

  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)

  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/events/yourEvents/${currentUser._id}`)
    .then(events => setEvents(events.data))
    .catch(err => console.log(err))
  }, [])



const handleDeleteEvent = async (e) => {

  const id = document.getElementById('eventID').value

  try{
    await axios.delete(`http://localhost:8000/events/${id}`)
    navigate('/yourEvents')
  }catch(err){
    console.log(err)
  }


}

  return (
    <>
      <Link to={'/dashboard'}>Go Back</Link>
    <p>{events.map(event => {
      return(
        <form>
          <p>{event.eventName}</p>
          <p>{event.eventTime.slice(0, 10)}</p>
          <p>{event.eventTipe}</p>
          <p>{event.eventAgeGroup}</p>
          <p>{event.eventFreeOrPay}</p>
          <p>{event.eventPlace}</p>
          <p>{event.eventDescription}</p>
          <p>{event.eventAuthorEmail}</p>
          <p>{event.eventAuthorPhone}</p>
          <Link to={`/currentEvent/${event._id}`}>View</Link>
          <button><Link to={`/editEvents/${event._id}`}>Edit</Link></button>
          <button onClick={handleDeleteEvent}>Delete</button>
          <input id='eventID' type='hidden' value={event._id}/>
        </form>
      )

    })}</p>

</>
  )
}


export default YourEvents