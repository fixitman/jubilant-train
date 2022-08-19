import React from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useStoreActions} from 'easy-peasy'


function RegisterPage() {

  const navigate = useNavigate()
  const setToken = useStoreActions(state=>state.auth.setToken)
  const setUser = useStoreActions(state=>state.auth.setUser)

  function register(values) {

    if (values) {
      
      axios.post('/api/auth/register', values)        
        .then((response) => {
            const {accessToken, user} = response.data
            setToken(accessToken)
            setUser(user)
            navigate('/')          
        })
        .catch(function (error) {
          if (error.response) {
            alert(`Error: ${error.response.data}`)
          } else if (error.request) {
            console.log('error', error.req)
          } else {
            console.log('error', error.config)
          }
        })
    }
  }

  return (
    <>
      <h1>Register Page</h1>
      <RegisterForm onSubmitForm={register} />
    </>


  )
}

export default RegisterPage