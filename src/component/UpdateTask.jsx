import React, { useEffect, useState } from 'react'
import '../style/addtask.css'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateTask() {
  const [taskData, setTaskData] = useState({ title: '', description: '' })

  const navigate = useNavigate();

  const {id}=useParams()
  console.log(id);
  

  useEffect(()=>{
    getTask(id)
  },[])

  const getTask = async (id)=>{
    let task = await fetch("http://localhost:3200/task/"+id)
    task = await task.json()
    if(task.result){
        setTaskData(task.result)
    }
  }

  const UpdateTask=async ()=>{
    console.log("functijk", taskData);
    let task = await fetch('http://localhost:3200/update-task',{
        method:'put',
        body:JSON.stringify(taskData),
        headers:{
            'content-Type':'Application/json'
        }
    });
    task = await task.json()
    console.log(task);
    if(task){
        navigate('/')
    }
  }

  return (
    <div className='container' >
        <h1>Update Task</h1>
            <label htmlFor="">Title</label>
            <input value={taskData.title} onChange={(event)=>setTaskData({...taskData,title:event.target.value})} type="text" name="title" placeholder='Enter Task Title' />
            <label htmlFor="">Description</label>
            <textarea value={taskData.description} onChange={(event)=>setTaskData({...taskData,description:event.target.value})}  rows={4} name="description" placeholder='Enter Task Description' id=""></textarea>
            <button onClick={UpdateTask} className='submit' >Update Task</button>
    </div>
  )
}

export default UpdateTask