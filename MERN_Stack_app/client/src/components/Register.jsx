import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()


    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      const res = await axios.post("http://localhost:8000/auth/register", {
        username,
        email,
        password
      })
      navigate('/login')
    }catch(error){
      console.log(error)
    }


  }


  return (
    <div>
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <input name="username" type="text" placeholder="Username" />
        <input name="email" type="text" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button>Register</button>
        <Link to="/login">Do you have an account?</Link>
      </form>
    </div>
    <div className="imgContainer">
    </div>
  </div>
  )
}

export default Register