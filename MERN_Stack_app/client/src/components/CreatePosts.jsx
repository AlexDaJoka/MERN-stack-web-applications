import axios from 'axios'
import {React, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext';

function CreatePosts() {

    const {updateUser, currentUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target)

        const postName = formData.get('postname');
        const place = formData.get('place');
        const price = formData.get('price');
        const bedrooms = formData.get('bedrooms');
        const bathrooms = formData.get('bathrooms');

        try{
            await axios.post(`http://localhost:8000/post/${currentUser._id}`, {
                postName,
                place,
                price,
                bedrooms,
                bathrooms
            })
            navigate('/posts')
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
        <h1>Create Post</h1>
        <input name="postname" type="text" placeholder="Postname" />
        <input name="place" type="text" placeholder="place" />
        <input name="price" type="number" placeholder="price" />
        <input name="bedrooms" type="number" placeholder="bedrooms" />
        <input name="bathrooms" type="number" placeholder="bathrooms" />
        <button>Create Post</button>
      </form>
    </div>
    </div>
    )
  )
}

export default CreatePosts