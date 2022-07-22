import React from 'react'
import LoginForm from '../components/LoginForm'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function LoginPage() {

  const navigate = useNavigate()

  function authenticate(values) {
    if (values) {
      const token = localStorage.getItem('token') || ''
      const options={}
      if(token){
        options.headers={
          Authorization: `Bearer ${token}`
        }
      }
      axios.post('/api/auth/login', values,options)        
        .then((response) => {
          if (response.status === 200 && response.data) {
            localStorage.setItem('token', response.data)
            navigate('/')
          }
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
      <h1>LoginPage</h1>
      <LoginForm onSubmitForm={authenticate} />
    </>


  )
}

export default LoginPage