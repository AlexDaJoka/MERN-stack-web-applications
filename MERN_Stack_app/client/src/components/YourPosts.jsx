import axios from 'axios'
import {React, useEffect, useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Link } from 'react-router-dom'

function YourPosts(){


    const {updateUser, currentUser} = useContext(AuthContext)

    const [posts, setPost] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/post/yourposts/${currentUser._id}`)
        .then(posts => setPost(posts.data))
        .catch(err => console.log(err))
      }, [])





const handleDeletePost = async (e) => {

  const formData = new FormData(e.target);
  
  const id = formData.get('_id');

  try{
    await axios.delete(`http://localhost:8000/post/${id}`)

  }catch(err){
    console.log(err)
  }


}

      

  return (
    <>
    <p>{posts.map(post => {
      return(
          <form onSubmit={handleDeletePost}>
          <input name='_id' type='hidden' defaultValue={post._id}/>
            <p>Название {post.postName}</p>
            <p>Место {post.place}</p>
            <p>Цена {post.price}$</p>
            <p>{post.bedrooms}</p>
            <p>{post.bathrooms}</p>
            <Link to={`/updatepost/${post._id}`}>Update post</Link>
            <button>Delete post</button>
          </form>
          )
        })}</p>
        </>
  )
}

export default YourPosts