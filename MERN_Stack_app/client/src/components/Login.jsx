import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "./AuthContext";

function Login() {

  const {updateUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault()


    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")


    try{
      const res = await axios.post("http://localhost:8000/auth/login", {
        username,
        password
      });

      navigate('/userPage');

      updateUser(res.data)
      

      console.log(res)
      
    }catch(error){
      console.log(error)
    }

  }



  return (
    <div>

<div>

<form onSubmit={handleSubmit}>
<label>Login</label>
<input name='username' type='text' placeholder='Username'/>
<input name="password" type="password" placeholder="Password" />
<button>Login</button>
<Link to="/register">Don't have an account?</Link>
</form>

<Link to="/">Go home</Link>

</div>

    </div>
  )
}

export default Login