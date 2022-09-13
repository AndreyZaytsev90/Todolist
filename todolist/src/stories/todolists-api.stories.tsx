import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {dividerClasses} from "@mui/material";

export default {
  title: 'Todolist/API'
}

//Todolists

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  /*useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data)
      })
  }, []);*/
  const getTodolists = () => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data)
      })
  }
  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <button onClick={getTodolists}>Get todolists</button>
    </div>
  </div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>("")
  /* useEffect(() => {
     todolistAPI.createTodolist("TODOLIST-1")
       .then((res) => {
         setState(res.data)
       })
   }, [])*/

  const createTodolist = () => {
    todolistAPI.createTodolist(title)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"Create new title"}
             value={title}
             onChange={(e) => setTitle(e.currentTarget.value)}/>
      <button onClick={createTodolist}>Create todolist</button>
    </div>
  </div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  /*useEffect(() => {
    const todolistId = '5eb59bfc-3550-4627-b6f3-5d8bffd695fb'
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])*/

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <button onClick={deleteTodolist}>Delete todolist</button>
    </div>
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [todolistTitle, setTodolistTitle] = useState<string>("")

  /* useEffect(() => {
     const todolistId = 'b89d8b6b-acb7-465c-8a85-a17592753c75'
     todolistAPI.updateTodolist(todolistId, "TODOLIST-3")
       .then((res) => {
         setState(res.data)
       })
   }, [])*/

  const updateTodolist = () => {
    todolistAPI.updateTodolist(todolistId, todolistTitle)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={"Create new title"}
             value={todolistTitle}
             onChange={(e) => setTodolistTitle(e.currentTarget.value)}/>
      <button onClick={updateTodolist}>Update title</button>
    </div>
  </div>
}


//Tasks
export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const getTasks = () => {
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <button onClick={getTasks}>Get tasks</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState<string>("")
  /* useEffect(() => {
     const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
     todolistAPI.createTask(todolistId, "Engine-3")
       .then((res) => {
         setState(res.data)
       })
   }, [])*/

  const createTask = () => {
    todolistAPI.createTask(todolistId, taskTitle)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={"Create new title"}
             value={taskTitle}
             onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
      <button onClick={createTask}>Create task</button>
    </div>
  </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)

  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  /* const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
   const taskId = 'cdf21d01-1a32-48b5-a04a-76f9418aa4f2'*/

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={"taskId"}
             value={taskId}
             onChange={(e) => setTaskId(e.currentTarget.value)}/>
      <button onClick={deleteTask}>Delete task</button>
    </div>
  </div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  const [taskTitle, setTaskTitle] = useState<string>("")

  const [description, setDescription] = useState<string>("")
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')
  /*useEffect(() => {
    const todolistId = "ee887034-a49e-4498-9c03-05bda0100281"
    const taskId = ''
    todolistAPI.updateTask(todolistId, taskId, "Door")
      .then((res) => {
        setState(res.data)
      })
  }, [])*/

  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
        description: description,
        status: status,
        priority: priority,
        startDate: '',
        deadline: '',
        title: taskTitle
      }
    )
      .then((res) => {
        setState(res.data)
      })
  }

  return <div>
    <div>{JSON.stringify(state)}</div>
    <div>
      <input placeholder={"todolistId"}
             value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={"taskId"}
             value={taskId}
             onChange={(e) => setTaskId(e.currentTarget.value)}/>
      <input placeholder={"Create new title"}
             value={taskTitle}
             onChange={(e) => setTaskTitle(e.currentTarget.value)}/>

      <input placeholder={"description"}
             value={description}
             onChange={(e) => setDescription(e.currentTarget.value)}/>
      <input placeholder={"status"}
             value={status}
             onChange={(e) => setStatus(+e.currentTarget.value)}/>
      <input placeholder={"priority"}
             value={priority}
             onChange={(e) => setPriority(+e.currentTarget.value)}/>
      <input placeholder={"startDate"}
             value={startDate}
             onChange={(e) => setStartDate(e.currentTarget.value)}/>
      <input placeholder={"deadline"}
             value={deadline}
             onChange={(e) => setDeadline(e.currentTarget.value)}/>
      <button onClick={updateTask}>Update task</button>
    </div>
  </div>
}

