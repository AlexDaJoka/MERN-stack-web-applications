import { Link } from "react-router-dom";
import React, { useContext } from 'react'
import { AuthContext } from "./AuthContext";

function Public(){

    const {currentUser} = useContext(AuthContext)


    const content = (
        <section>
            <h1>index</h1>
            <Link to={'/register'}>register</Link>
            <Link to={'/login'}>login</Link>
        </section>
    )
    return content

}

export default Public