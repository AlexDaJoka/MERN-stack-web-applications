import { Route, Routes } from "react-router-dom";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import UserList from "./features/users/UserList";
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import Prefatch from './features/auth/Prefetch'

import ProductList from './features/products/ProductList'

function App() {
  return (
    <Routes>


        <Route path="/" element={<Public/> }/>
        
        <Route path="login" element={<Login/> } />



<Route element={<Prefatch/>}>

<Route path="products" element={<ProductList/>}/>



<Route path="dash" element={<DashLayout/>}>
  <Route index element={<Welcome/>}/>

<Route path="users">
<Route index element={<UserList/>}/>
<Route path=":id" element={<EditUser/>}/>
<Route path="new" element={<NewUserForm/>}/>
</Route>


<Route path="products">

</Route>

</Route>





</Route>

    </Routes>
  );
}

export default App;
