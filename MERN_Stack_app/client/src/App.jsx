import { Route, Routes } from "react-router-dom";
import Public from "./components/Public";
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage';
import UpdatePage from './components/UpdateUser'
import CreatePost from './components/CreatePosts'
import AllPosts from './components/AllPosts'
import Post from './components/Post'
import YourPosts from "./components/YourPosts";
import UpdatePosts from "./components/UpdatePosts";


function App() {

  return (
    <Routes>
  
  
          <Route path="/" element={<Public/> }/>
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
  
  
  <Route path="/userPage" element={<UserPage/>}/>
  
  <Route path="update" element={<UpdatePage/>}/>
  
  <Route path="/createposts" element={<CreatePost/>}/>

  <Route path="/posts" element={<AllPosts/>}/>

  <Route path="/currentPost/:id" element={<Post/>}/> 

  <Route path="/yourposts" element={<YourPosts/>}/> 

  <Route path="/updatepost/:id" element={<UpdatePosts/>}/> 


  
      </Routes>
    );

}


export default App;
