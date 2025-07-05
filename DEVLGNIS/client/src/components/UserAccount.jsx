import {React, useEffect, useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function UserAccount() {


const navigate = useNavigate()

const {updateUser, currentUser} = useContext(AuthContext)


const handleLogout = async(e) => {

e.preventDefault()

try{
  await axios.post("http://localhost:8000/auth/logout")
  localStorage.removeItem('validUser');
  updateUser(null)
  navigate('/')
}catch(err){
  console.log(err)
}

}



const handleDelete = async (e) => {

  e.preventDefault()

  try{
    await axios.delete(`http://localhost:8000/users/${currentUser._id}`)
    localStorage.removeItem('validUser');
    updateUser(null)
    navigate('/')
  }catch(err){
    console.log(err)
  }

}

useEffect(() => {
  if(!currentUser){
    navigate('/login')
  }
}, [currentUser, navigate])

  return (
    currentUser && (
    <section>
<p>Пользователь: {currentUser.username}</p>
<button onClick={handleLogout}>logout</button>
<button onClick={handleDelete}>delete</button>
<Link to={'/update'}>Update profile</Link>
<button><Link to={'/createEvents'}>Создать событие</Link></button>
<button><Link to={'/yourEvents'}>Твои события</Link></button>
<button><Link to={'/allEvents'}>Все события</Link></button>
    </section>
  )
  )
}

export default UserAccount