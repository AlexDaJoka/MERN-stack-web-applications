import { Route, Routes } from "react-router-dom";
import Home from "./components/Homepage";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UpdateProfile from "./components/UpdateProfile";
import Messager from './components/Messager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/update" element={<UpdateProfile/>}/>
      <Route path="/messager" element={<Messager/>}/>
    </Routes>
  );
}

export default App;
