import axios from 'axios';
import {React, useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function UpdatePosts() {

    const navigate = useNavigate()

    const {updateUser, currentUser} = useContext(AuthContext)

    const url = window.location.href.slice(33)

    const [posts, setPost] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:8000/post/${url}`)
      .then(posts => setPost(posts.data))
      .catch(err => console.log(err))
    }, [])

const handleSubmit = async (e) =>{

    e.preventDefault()

    const formData = new FormData(e.target)

    const postName = formData.get('postname');
    const place = formData.get('place');
    const price = formData.get('price');
    const bedrooms = formData.get('bedrooms');
    const bathrooms = formData.get('bathrooms');

    try{
        await axios.patch(`http://localhost:8000/post/${url}`, {
            postName,
            place,
            price,
            bedrooms,
            bathrooms
        });
        navigate('/yourposts')
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
        <div>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Update Post</h1>
            <input name="postname" type="text" placeholder="Postname" defaultValue={posts.postName}/>
            <input name="place" type="text" placeholder="place" defaultValue={posts.place}/>
            <input name="price" type="number" placeholder="price" defaultValue={posts.price}/>
            <input name="bedrooms" type="number" placeholder="bedrooms" defaultValue={posts.bedrooms}/>
            <input name="bathrooms" type="number" placeholder="bathrooms" defaultValue={posts.bathrooms}/>
            <button>Update Post</button>
            <Link to={'/yourposts'}>Go back</Link>
          </form>
        </div>
        </div>
        )
  )
}

export default UpdatePosts