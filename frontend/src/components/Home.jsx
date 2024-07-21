import React from 'react'
import NavBar from './NavBar'

const Home = () => {
  return (
    <div>
        <NavBar/>
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' ,fontSize:"40px"}}>Welcome to the Admin panel</h1>
    </div>
  )
}

export default Home
