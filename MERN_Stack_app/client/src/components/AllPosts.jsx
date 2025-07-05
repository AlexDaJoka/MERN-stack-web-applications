import axios from 'axios';
import {React, useContext, useEffect, useState} from 'react'
import { useLoaderData, useNavigate, Link} from 'react-router-dom'
//import { AuthContext } from './AuthContext';

function AllPosts(){

  const [posts, setPost] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/post")
    .then(posts => setPost(posts.data))
    .catch(err => console.log(err))
  }, [])

  console.log(posts)



  return (
  <form>

    <p>{posts.map(post => {
      return(
        <form>
          <p>Название {post.postName}</p>
          <p>Место {post.place}</p>
          <p>Цена {post.price}$</p>
          <p>{post.bedrooms}</p>
          <p>{post.bathrooms}</p>
          <Link to={`/currentPost/${post._id}`}>View post</Link>
        </form>
      )

    })}</p>

  
    
</form>
  )
}

export default AllPosts