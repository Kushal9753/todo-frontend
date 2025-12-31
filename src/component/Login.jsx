import React, { useState, useEffect } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
 const [userData, setUserData] = useState({})
 const navigate = useNavigate()

 useEffect(()=>{
  if(localStorage.getItem('login')){
    navigate('/')
  }
 },[])

 const handleLogin = async () => {
    let result = await fetch('https://todo-backend-six-beta.vercel.app/login', {
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
      window.dispatchEvent(new Event('localStorage-change'))
      navigate('/')
    } else {
      alert("try after some time")
    }
 }

 return (
  <div className='container'>
    <h1>Login</h1>

    <label htmlFor="">Email</label>
    <input
      type="text"
      placeholder="Enter User email"
      onChange={(e)=>setUserData({...userData,email:e.target.value})}
    />

    <label htmlFor="">Password</label>
    <input
      type="password"
      placeholder="Enter User password"
      onChange={(e)=>setUserData({...userData,password:e.target.value})}
    />

    <button onClick={handleLogin} className='submit'>Login</button>
    <Link className='link' to="/signup">Sign Up</Link>
  </div>
 )
}

export default Login
