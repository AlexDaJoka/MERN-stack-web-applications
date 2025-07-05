import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from './AuthContext'


function Login() {

const navigate = useNavigate()
const {updateUser} = useContext(AuthContext)

const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target)

  const email = formData.get('email')
  const password = formData.get('password')

  try{
   const res = await axios.post("http://localhost:8000/auth/login",{
      email,
      password
    });
    navigate('/dashboard');
    localStorage.setItem('token', res.data);
    updateUser(res.data);
  }catch(err){
    console.log(err)
  }

}



  return (
    <form onSubmit={handleLogin}>
      <input name='email' type='email' placeholder='email'/>
      <input name='password' type='text' placeholder='password'/>
      <button>Login</button>
      <p>Нет аккаунта<Link to={'/register'}>register</Link></p>
    </form>
  )
}

export default Login