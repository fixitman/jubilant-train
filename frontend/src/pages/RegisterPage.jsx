import React from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { Box, Typography } from '@mui/material'


function RegisterPage() {

  const navigate = useNavigate()
  const setToken = useStoreActions(state => state.auth.setToken)
  const setUser = useStoreActions(state => state.auth.setUser)
  const setError = useStoreActions(state => state.error.setError)

  function register(values) {

    if (values) {

      axios.post('/api/auth/register', values)
        .then((response) => {
          const { accessToken, user } = response.data
          setToken(accessToken)
          setUser(user)
          navigate('/')
        })
        .catch(function (error) {
          if (error.response) {
            setError(error.response.data)
          } else {
            console.error('error', error.config)
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
          backgroundColor: '#faefe1',
          borderStyle: 'solid',
          borderColor: "primary.main",
          borderRadius: '2.5rem',
          width: 400,
          padding: '2rem'
          
        }}
      >
        <Typography variant='h4' color={"primary.main"} mb={"2rem"}>
          Sign Up
        </Typography>
        <RegisterForm onSubmitForm={register} />
        <Box sx={{ textAlign: 'center' }} >
          <p>Have an account? <Link to={'/login'} >Log in</Link></p>
        </Box>

      </Box>
    </>


  )
}

export default RegisterPage