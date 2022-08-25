import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Typography } from '@mui/material'
//import usePrivateAxios from '../hooks/usePrivateAxios'
import axios from '../api/axios'


const Home = () => {
  
  //const privateAxios = usePrivateAxios()
  const user = useStoreState(state => state.auth.user)
  const setError = useStoreActions(state => state.error.setError)
  const setUser = useStoreActions(state => state.auth.setUser)
  const setToken = useStoreActions(state => state.auth.setToken)

  const logout = async () => {
    await axios.get('/auth/logout', { withCredentials: true })
    setUser(null)
    setToken(null)
    setError(null)
  }

/*   const handleClick = async (e) => {
    await privateAxios.get('/auth/login')   
      .catch((e) => {
        console.log('CAUGHT',e.message)
      })

  }


  const handleClick2 = async(e) => {
    const r = await privateAxios.get('/auth/test')    
    .catch((err)=>{      
      console.log(err)         
    })

    if(r.data){
      console.log(r.data)
    }else{
      console.log('result is empty')
    }
  } */

  return (
    <>
      <Typography variant='h3'> {`Welcome, ${user.firstName}!`}</Typography>
      <button onClick={logout}>logout</button>
      {/* <br />
      <button onClick={handleClick}>button</button>
      <br />
      <button onClick={handleClick2}>button2</button> */}
    </>
  )
}

export default Home