import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

  const navigate = useNavigate()

  const handleRegister = async (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)

    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try{
      await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password
      });
      navigate('/login')
    }catch(err){

    }

  }


  return (
    <form onSubmit={handleRegister}>
      <input name='username' type='text' placeholder='username'/>
      <input name='email' type='email' placeholder='email'/>
      <input name='password' type='text' placeholder='password'/>
      <button>Register</button>
      <p>Уже есть аккаунт<Link to={'/login'}>login</Link></p>
    </form>
  )
}

export default Register