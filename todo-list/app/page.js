"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    setMainTask([...mainTask, { title, description }])
    setTitle("")
    setDescription("")
    console.log(mainTask)
  }

  const deleteHandler = (index) => {
    let copyTask = [...mainTask]
    copyTask.splice(index, 1)
    setMainTask(copyTask)
  }


  let renderTask = <h2>No task Available</h2>

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, index) => {
      return (
        <li key={index} className='flex items-center justify-between mb-8'>
          <div className='flex justify-between mb-4 w-2/3'>
            <h5 className='text-semibold text-xl'>{task.title}</h5>
            <h6 className='text-medium text-lg'>{task.description}</h6>
          </div>
          <button onClick={
            () => deleteHandler(index)
          } className='bg-red-400 rounded font-bold text-white p-2'>
            Delete Task
          </button>
        </li>
      )
    })
  }


  return (
    <>
      <h1 className='bg-black
    text-white p-6 text-3xl font-bold text-center'>Your To-Do List</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-1xl border-zinc-700 border-4 m-5 px-7 py-3'
          placeholder='Enter task title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <input
          type='text'
          className='text-1xl border-zinc-700 border-4 m-5 px-7 py-3'
          placeholder='Enter task description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />

        <button className='bg-black text-white font-bold px-4 py-3 m-5 text-1xl rounded'>Add Task</button>

      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page