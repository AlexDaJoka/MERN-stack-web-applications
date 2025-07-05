import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <section>
    <Link to="/login">Войти</Link>
   </section>
  )
}

export default Home