import React, { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api'

function UpdateTask() {
  const [taskData, setTaskData] = useState({ title: '', description: '' })
  const navigate = useNavigate()
  const {id}=useParams()

  useEffect(()=>{ getTask() },[])

  const getTask = async ()=>{
    const { data } = await API.get('/tasks')
    const task = data.result.find(t=>t._id===id)
    setTaskData(task)
  }

  const updateTask = async ()=>{
    await API.put('/update-task', { ...taskData, _id:id })
    navigate('/')
  }

  return (
    <div className='container'>
        <h1>Update Task</h1>
        <label>Title</label>
        <input value={taskData.title} onChange={e=>setTaskData({...taskData,title:e.target.value})}/>
        <label>Description</label>
        <textarea value={taskData.description} onChange={e=>setTaskData({...taskData,description:e.target.value})}/>
        <button onClick={updateTask} className='submit'>Update Task</button>
    </div>
  )
}

export default UpdateTask
