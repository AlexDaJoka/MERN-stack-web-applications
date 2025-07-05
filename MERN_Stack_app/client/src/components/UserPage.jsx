import {React, useContext, useEffect } from 'react'
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function UserPage() {

  const {updateUser, currentUser} = useContext(AuthContext)

  const navigate = useNavigate();


  const handleDelete = async (e) => {
    e.preventDefault()


    try{
      await axios.delete(`http://localhost:8000/users/${currentUser._id}`)
      localStorage.removeItem("validUser");
      updateUser(null)
      navigate('/')
    }catch(err){
      console.log(err)
    }


  }


  const handleLogout = async (e) => {

    e.preventDefault()
  
    try{
      await axios.post("http://localhost:8000/auth/logout");
      updateUser(null)
      localStorage.removeItem("validUser");
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
            <span>Username: {currentUser.username}</span>
            <span>email: {currentUser.email}</span>
            <Link to={'/update'}>Update</Link>
            <Link to={'/createposts'}>Create posts</Link>
            <Link to={'/yourposts'}>Your posts</Link>
            <button onClick={handleDelete}>delete</button>
            <button onClick={handleLogout} >Logout</button>
    </section>
    )
  )
}

export default UserPage