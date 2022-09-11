import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'Tasks/API'
}


export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data.items[0].title)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
    todolistAPI.createTask(todolistId, "Engine")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
    const taskId = ''
    todolistAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
    const taskId = '10f39b35-0735-4844-a0ad-e51500c13ea9'
    todolistAPI.updateTask(todolistId, taskId, "Door")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

