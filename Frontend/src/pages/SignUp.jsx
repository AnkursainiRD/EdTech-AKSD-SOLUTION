import React from 'react'
import Template from '../components/cors/auth/Template'
import signup from "../assets/images/signup.webp"

function SignUp() {
  return (
    <Template
    title = "Join the millions learning to code with AKSD for free"
    des1 = "Build skills for today, tomorrow, and beyond."
    des2 = "Education to future-proof your career."
    image = {signup}
    formType = "signUp"
    />
  )
}

export default SignUp