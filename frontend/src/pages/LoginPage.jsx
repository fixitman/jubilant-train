import React from 'react'
import LoginForm from '../components/LoginForm'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useStoreActions } from 'easy-peasy'
import { Box, Typography } from '@mui/material'


function LoginPage() {

  const navigate = useNavigate()
  const setUser = useStoreActions(state => state.auth.setUser)
  const setError = useStoreActions(state => state.error.setError)
  const setToken = useStoreActions(state => state.auth.setToken)
  const destination = useLocation().state?.from || '/'

  function authenticate(values) {
    setError('')
    if (values) {

      axios.post('/api/auth/login', values)
        .then((response) => {
          const { accessToken, user } = response.data
          setToken(accessToken)
          setUser(user)
          navigate(destination)
        })
        .catch(function (error) {
          if (error.response) {
            setError(error.response.data)
          } else {
            setError("Sorry something went wrong")
            console.error( error)
          }
        })
    }

  }

  return (
    <>
      <Box
        sx={{
          mx: "auto",
          mt: '5rem',
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: "primary.main",
          borderRadius: '2.5rem',
          width: 400,
          padding : '2rem',
          backgroundColor: 'white'          
        }}
      >
        <Typography variant='h4'color={"primary.main"} mb={"2rem"}>
          Please log in
        </Typography>
        <LoginForm onSubmitForm={authenticate} />
        <Box sx={{textAlign:'center'}} ><p>No account? <Link to={'/register'} >Sign Up</Link></p></Box>

      </Box>

    </>


  )
}

export default LoginPage