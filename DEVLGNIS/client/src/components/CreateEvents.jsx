import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from './AuthContext'

function CreateEvents() {

  const navigate = useNavigate()

  const {currentUser} = useContext(AuthContext)


  const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/events/yourEvents/${currentUser._id}`)
    .then(events => setEvents(events.data))
    .catch(err => console.log(err))
  }, [])



const handleCreateEvents = async (e) => {

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
     const res = await axios.post('http://localhost:8000/events/createEvent', {
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
    navigate(`/currentEvent/${res.data._id}`)
  }catch(err){
    console.log(err)
  }

  

}


  return (
    <form onSubmit={handleCreateEvents}>
      <input name='eventName' type='text' placeholder='Название события'/>
      <input name='eventTime' type='date'/>

       <select name='eventTipe'>
        <option>Футбол</option>
        <option>Баскетбол</option>
        <option>Валейбол</option>
       </select>

       <input name='eventAgeGroup' type='number' placeholder='Целевой возраст'/>
      <select name='eventFreeOrPay'>
        <option>Платно</option>
        <option>Безплатно</option>
       </select>


      <input name='eventPlace' placeholder='Место'/>

      <textarea name='eventDescription' placeholder='Описание'/>
      <input name='eventAuthor' type='hidden' defaultValue={currentUser._id}/>
      <input name='eventAuthorEmail' type='email' defaultValue={currentUser.email}/>
      <input name='eventAuthorPhone' type='number' defaultValue={currentUser.phone} placeholder='Контактный номер'/>
      <button>Создать событие</button>
      <Link to={'/dashboard'}>Go Back</Link>
    </form>
  )
}

export default CreateEvents