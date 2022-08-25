import React from 'react'
import LoginForm from '../components/LoginForm'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useStoreActions } from 'easy-peasy'
import { Box, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles";


function LoginPage() {

  const navigate = useNavigate()
  const setUser = useStoreActions(state => state.auth.setUser)
  const setError = useStoreActions(state => state.error.setError)
  const setToken = useStoreActions(state => state.auth.setToken)
  const destination = useLocation().state?.from || '/'
  const theme = useTheme()

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
          backgroundColor: theme.palette.Linen,          
          borderWidth: '4px',
          borderStyle: 'solid',
          borderColor: "primary.main",
          borderRadius: '2.5rem',
          width: 400,
          padding : '2rem'
             
        }}
      >
        <Typography variant='h4'color={"primary"} mb={4}>
          Please log in
        </Typography>
        <LoginForm onSubmitForm={authenticate} />
        <Box sx={{textAlign:'center', mt:5}} ><p>No account? <Link to={'/register'} >Sign Up</Link></p></Box>

      </Box>

    </>


  )
}

export default LoginPage