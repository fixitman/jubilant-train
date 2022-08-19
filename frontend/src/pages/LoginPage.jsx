import React from 'react'
import LoginForm from '../components/LoginForm'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useStoreActions} from 'easy-peasy'

function LoginPage() {

  const navigate = useNavigate()
  const setUser = useStoreActions(state => state.auth.setUser)
  const setToken = useStoreActions(state=>state.auth.setToken)
  const destination = useLocation().state?.from || '/'

  function authenticate(values) {
    if (values) {
      
      axios.post('/api/auth/login', values)        
        .then((response) => {
            const {accessToken, user} = response.data
            setToken(accessToken)
            setUser(user)
            navigate(destination)          
        })
        .catch(function (error) {
          if (error.response) {
            alert(`Error: ${error.response.data}`)
          } else if (error.request) {
            console.error('error', error.req)
          } else {
            console.error('error', error)
          }
        })     
    }

  }

  return (
    <>
      <h1>LoginPage</h1>
      <LoginForm onSubmitForm={authenticate} />
    </>


  )
}

export default LoginPage