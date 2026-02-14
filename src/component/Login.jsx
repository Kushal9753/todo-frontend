import React, { useState, useEffect } from 'react'
import '../style/addtask.css'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function Login() {
 const [userData, setUserData] = useState({})
 const navigate = useNavigate()

 useEffect(()=>{
  if(localStorage.getItem('login')) navigate('/')
 },[])

 const handleLogin = async () => {
    const { data } = await API.post('/login', userData)


if (data.success) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("login", userData.email);
  window.location.href = "/";   // ⭐️ IMPORTANT
}



 else {
      alert("Try again")
    }
 }

 return (
  <div className='container'>
    <h1>Login</h1>

    <label>Email</label>
    <input onChange={(e)=>setUserData({...userData,email:e.target.value})} />

    <label>Password</label>
    <input type="password" onChange={(e)=>setUserData({...userData,password:e.target.value})} />

    <button onClick={handleLogin} className='submit'>Login</button>
    <Link className='link' to="/signup">Sign Up</Link>
  </div>
 )
}

export default Login
