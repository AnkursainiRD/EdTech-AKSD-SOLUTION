import React from 'react'
import Template from '../components/cors/auth/Template'
import login from "../assets/images/login.webp"

function Login() {
  return (
    <Template
    title="Welcome Back"
    des1="Build skills for today, tomorrow, and beyond."
    des2="Education to future-proof your career."
    image={login}
    formType="login"/>
  )
}

export default Login