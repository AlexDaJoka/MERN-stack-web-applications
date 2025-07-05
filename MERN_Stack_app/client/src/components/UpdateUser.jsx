import {React, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from "./AuthContext";


function UpdateUser() {

    const {updateUser, currentUser} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      
      e.preventDefault()
  
  
      const formData = new FormData(e.target);

      const id = formData.get('_id')
      const username = formData.get("username")
      const email = formData.get("email")
      const password = formData.get("password")
  
  
      try{
        const res = await axios.patch(`http://localhost:8000/users/${id}`, {
          username,
          email,
          password
        });
        updateUser(res.data)
        
        navigate('/userPage');

        console.log(res)
        
      }catch(error){
        console.log(error)
      }

  
    }


    useEffect(() => {
      if(!currentUser){
       navigate('/login')
      }
    }, [currentUser, navigate])

  return (
    currentUser && (
    <div>
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <input name='_id' type='hidden' defaultValue={currentUser._id}></input>
        <input name="username" type="text" placeholder="Username" defaultValue={currentUser.username}/>
        <input name="email" type="text" placeholder="Email" defaultValue={currentUser.email}/>
        <input name="password" type="password" placeholder="Password" />
        <button>Update</button>
      </form>
    </div>
    <div className="imgContainer">
    </div>
  </div>
    )
  )
}

export default UpdateUser