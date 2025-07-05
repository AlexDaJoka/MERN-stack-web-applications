import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'
import UserAccount from "./components/UserAccount";
import UpdateProfile from "./components/UpdateProfile";
import CreateEvents from './components/CreateEvents';
import AllEvents from './components/AllEvents';
import CurrentEvent from './components/CurrentEvent';
import YourEvents from './components/YourEvents';
import EditEvents from './components/EditEvents';

function App() {
  return (
<Routes>

  <Route path="/" element={<Home/> }/>
  <Route path='login' element={<Login/>}/>
  <Route path="register" element={<Register/>}/>

  <Route path="/dashboard" element={<UserAccount/>}/>
  <Route path="update" element={<UpdateProfile/>}/>

  <Route path="createEvents" element={<CreateEvents/>}/>
  <Route path="yourEvents" element={<YourEvents/>}/>
  <Route path="allEvents" element={<AllEvents/>}/>
  <Route path="currentEvent/:id" element={<CurrentEvent/>}/>

  <Route path="editEvents/:id" element={<EditEvents/>}/>

</Routes>
  );
}

export default App;
