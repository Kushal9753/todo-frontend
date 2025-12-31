import React, { useState } from 'react'
import '../style/addtask.css'
import { useNavigate } from 'react-router-dom'

function AddTask() {
  const [taskData, setTaskData] = useState({ title:'', description:'' })
  const navigate = useNavigate()

  const handleAddTask = async () => {
    let result = await fetch('https://todo-backend-six-beta.vercel.app/add-task',{
      method:'POST',
      credentials:'include',
      body: JSON.stringify(taskData),
      headers:{ 'Content-Type':'application/json' }
    })

    result = await result.json()
    if(result.success) navigate('/')
  }

  return (
    <div className='container'>
      <h1>Add New Task</h1>

      <label>Title</label>
      <input
        type="text"
        placeholder="Enter Task Title"
        onChange={e=>setTaskData({...taskData,title:e.target.value})}
      />

      <label>Description</label>
      <textarea
        rows={4}
        placeholder="Enter Task Description"
        onChange={e=>setTaskData({...taskData,description:e.target.value})}
      />

      <button onClick={handleAddTask} className='submit'>Add new Task</button>
    </div>
  )
}

export default AddTask
