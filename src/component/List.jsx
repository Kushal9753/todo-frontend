import React, { Fragment, useEffect, useState } from 'react'
import '../style/list.css'
import { Link } from 'react-router-dom'
import API from '../api'

function List() {
  const [taskData, setTaskData] = useState([])
  const [selectedTask, setSelectedTask] = useState([])

  useEffect(()=>{ getListData() },[])

  const getListData = async () => {
    const { data } = await API.get('/tasks')
    if(data.success) setTaskData(data.result)
  }

  const deleteTask = async (id) => {
    await API.delete(`/delete/${id}`)
    getListData()
  }

  const deleteMultiple = async () => {
    await API.delete('/delete-multiple', { data: selectedTask })
    getListData()
  }

  const selectAll = e => {
    setSelectedTask(e.target.checked ? taskData.map(i=>i._id) : [])
  }

  const selectSingleItem = id => {
    setSelectedTask(
      selectedTask.includes(id)
        ? selectedTask.filter(i=>i!==id)
        : [id,...selectedTask]
    )
  }

  return (
    <div className='list-container'>
      <h1>To Do List</h1>
      <button onClick={deleteMultiple} className='delete-item delete-multiple'>Delete</button>

      <ul className='task-list'>
        <li className='list-header'><input type="checkbox" onChange={selectAll}/></li>
        <li className='list-header'>S.No</li>
        <li className='list-header'>Title</li>
        <li className='list-header'>Description</li>
        <li className='list-header'>Action</li>

        {taskData.map((item,i)=>(
          <Fragment key={item._id}>
            <li className='list-item'>
              <input
                type="checkbox"
                checked={selectedTask.includes(item._id)}
                onChange={()=>selectSingleItem(item._id)}
              />
            </li>
            <li className='list-item'>{i+1}</li>
            <li className='list-item'>{item.title}</li>
            <li className='list-item'>{item.description}</li>
            <li className='list-item'>
              <button onClick={()=>deleteTask(item._id)} className='delete-item'>Delete</button>
              <Link to={`/update/${item._id}`} className='update-item'>Update</Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default List
