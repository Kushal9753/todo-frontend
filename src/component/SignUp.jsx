import React, { useState, useEffect } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function SignUp() {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('login')) navigate('/')
  },[])

  const handleSignup = async () => {
    const { data } = await API.post('/signup', userData)

    if (data.success) {
      localStorage.setItem('login', userData.email)
      navigate('/')
    } else {
      alert("Try again")
    }
  }

  return (
    <div className='container'>
      <h1>Sign Up</h1>

      <label>Name</label>
      <input onChange={(e)=>setUserData({...userData,name:e.target.value})} />

      <label>Email</label>
      <input onChange={(e)=>setUserData({...userData,email:e.target.value})} />

      <label>Password</label>
      <input type="password" onChange={(e)=>setUserData({...userData,password:e.target.value})} />

      <button onClick={handleSignup} className='submit'>Sign Up</button>
      <Link className='link' to="/login">Login</Link>
    </div>
  )
}

export default SignUp
