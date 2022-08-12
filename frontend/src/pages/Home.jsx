import React from 'react'
import {  useStoreState, useStoreActions } from 'easy-peasy'
import { Typography } from '@mui/material'
import axios from 'axios'



const Home = () => {
  
  const user = useStoreState(state => state.auth.user)
  const setUser = useStoreActions(state => state.auth.setUser)

  const logout = async () =>{
    await axios.get('/api/auth/logout',{withCredentials: true})
    setUser(null)

  }
  


  
  return (
    <> 
       <Typography variant='h3'> {`Welcome, ${user.firstName}!`}</Typography>
       <button onClick={logout}>logout</button>
      


      

    </>
  )
}

export default Home