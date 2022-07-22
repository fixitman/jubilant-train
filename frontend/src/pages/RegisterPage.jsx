import React from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function RegisterPage() {

  const navigate = useNavigate()

  // axios.interceptors.request.use((req) => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     req.headers.authorization = 'Bearer ' + token
  //   }
  //   return req
  // })

  function register(values) {
    if (values) {
      axios.post('/api/auth/register', values)
        .then((response) => {
          if(response.data?.token){
            localStorage.setItem('token',response.data.token)            
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
      <h1>Register Page</h1>
      <RegisterForm onSubmitForm={register} />
    </>


  )
}

export default RegisterPage