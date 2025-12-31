import React, { useState, useEffect } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('login')){
      navigate('/')
    }
  },[])

  const handleSignup = async () => {
    let result = await fetch('https://todo-backend-six-beta.vercel.app/signup', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    result = await result.json()

    if (result.success) {
      localStorage.setItem('login', userData.email)
      navigate('/')
    } else {
      alert("try after some time")
    }
  }

  return (
    <div className='container'>
      <h1>Sign Up</h1>

      <label>Name</label>
      <input
        type="text"
        placeholder="Enter User name"
        onChange={(e)=>setUserData({...userData,name:e.target.value})}
      />

      <label>Email</label>
      <input
        type="text"
        placeholder="Enter User email"
        onChange={(e)=>setUserData({...userData,email:e.target.value})}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter User password"
        onChange={(e)=>setUserData({...userData,password:e.target.value})}
      />

      <button onClick={handleSignup} className='submit'>Sign Up</button>
      <Link className='link' to="/login">Login</Link>
    </div>
  )
}

export default SignUp
