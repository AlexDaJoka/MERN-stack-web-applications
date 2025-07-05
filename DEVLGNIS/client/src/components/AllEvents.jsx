import {React, useEffect, useContext, useState} from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios';
import {Link} from 'react-router-dom'

function AllEvents() {

  const {currentUser} = useContext(AuthContext)

  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/events`)
    .then(events => setEvents(events.data))
    .catch(err => console.log(err))
  }, [])


  


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
        </form>
      )

    })}</p>

  
    
</>
  )
}

export default AllEvents