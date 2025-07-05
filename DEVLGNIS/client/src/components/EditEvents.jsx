import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from './AuthContext'

function EditEvents() {

  const navigate = useNavigate()

  const url = window.location.href.slice(33);

  const {currentUser} = useContext(AuthContext)

  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/events/${url}`)
    .then(events => setEvents(events.data))
    .catch(err => console.log(err))
  }, [])


  const handleEditEvents = async (e) => {

    e.preventDefault();
  
    const formData = new FormData(e.target)
  
    const eventName = formData.get('eventName');
    const eventTime = formData.get('eventTime');
    const eventTipe = formData.get('eventTipe');
    const eventAgeGroup = formData.get('eventAgeGroup');
    const eventFreeOrPay = formData.get('eventFreeOrPay');
    const eventPlace = formData.get('eventPlace');
    const eventDescription = formData.get('eventDescription');
    const eventAuthor = formData.get('eventAuthor');
    const eventAuthorPhone = formData.get('eventAuthorPhone');
    const eventAuthorEmail = formData.get('eventAuthorEmail');
  
  
  
    try{
      await axios.patch(`http://localhost:8000/events/${url}`, {
        eventName,
        eventTime,
        eventTipe,
        eventAgeGroup,
        eventFreeOrPay,
        eventPlace,
        eventDescription,
        eventAuthor,
        eventAuthorPhone,
        eventAuthorEmail
      });
      navigate(`/yourEvents`)
    }catch(err){
      console.log(err)
    }
  
    
  
  }

  return (
    <form onSubmit={handleEditEvents}>
    <input name='eventName' type='text' placeholder='Название события' defaultValue={events.eventName}/>
    <input name='eventTime' type='date' defaultValue={events.eventTime}/>

     <select name='eventTipe' defaultValue={events.eventTipe}>
      <option>Футбол</option>
      <option>Баскетбол</option>
      <option>Валейбол</option>
     </select>

     <input name='eventAgeGroup' type='number' placeholder='Целевой возраст' defaultValue={events.eventAgeGroup}/>

    <select name='eventFreeOrPay' defaultValue={events.eventFreeOrPay}>
      <option>Платно</option>
      <option>Безплатно</option>
     </select>


    <input name='eventPlace' placeholder='Место' defaultValue={events.eventPlace}/>

    <textarea name='eventDescription' placeholder='Описание' defaultValue={events.eventDescription}/>
    <input name='eventAuthor' type='hidden' defaultValue={events.eventAuthor}/>
    <input name='eventAuthorEmail' type='email' defaultValue={events.eventAuthorEmail}/>
    <input name='eventAuthorPhone' type='number' defaultValue={events.eventAuthorPhone} placeholder='Контактный номер'/>
    <button>Обновить событие</button>
    <Link to={'/yourEvents'}>Go Back</Link>
  </form>
  )
}

export default EditEvents