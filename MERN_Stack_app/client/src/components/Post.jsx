import {React, useEffect, useState} from 'react'
import Link from 'react-router-dom'
import axios from 'axios'

function Post() {

 const url = window.location.href.slice(34)

  const [posts, setPost] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/post/${url}`)
    .then(posts => setPost(posts.data))
    .catch(err => console.log(err))
  }, [])

  return (
<form>

    <p>{posts.postName}</p>
    <p>Место {posts.place}</p>
    <p>Цена {posts.price}$</p>
    <p>{posts.bedrooms}</p>
    <p>{posts.bathrooms}</p>
    
</form>
  )
}

export default Post