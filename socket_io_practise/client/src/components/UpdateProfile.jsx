import React, { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import axios from 'axios'

function UpdateProfile() {

const navigate = useNavigate()

const {updateUser, currentUser} = useContext(AuthContext)


const handleUpdate = async (e) => {

  e.preventDefault()

  const formData = new FormData(e.target);

  const username = formData.get('username');
  const email = formData.get('email');
  const gender = formData.get('gender');
  const age = formData.get('age');
  const phone = formData.get('phone');
  const TG = formData.get('TG');
  const password = formData.get('password');

  try{
    const res = await axios.patch(`http://localhost:8000/users/${currentUser._id}`,{
      username,
      email,
      password
    })
    updateUser(res.data)
    navigate('/dashboard')
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
    <form onSubmit={handleUpdate}>
      <input name='username' type='text' placeholder='username' defaultValue={currentUser.username}/>
      <input name='email' type='email' placeholder='email' defaultValue={currentUser.email}/>
      <input name='password' type='text' placeholder='password' defaultValue={currentUser.password}/>
      <button>Update</button>
      <p><Link to={'/dashboard'}>Back</Link></p>
    </form>
  )
  )
}

export default UpdateProfile