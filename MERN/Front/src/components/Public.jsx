import { Link } from "react-router-dom";


import React from 'react'

const Public = () => {

    const content = (
        <section>
            <h1>index</h1>
            <p><Link to={'/login'}>Login</Link></p>
        </section>
    )
    return content

}

export default Public