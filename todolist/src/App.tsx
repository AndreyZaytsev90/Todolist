import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppHeader} from "./AppHeader";
import {Container, Grid, Paper} from "@mui/material";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: todolistID1},
      {id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: todolistID1},
      {id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: todolistID1},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Low, startDate: "", todoListId: todolistID2},
      {id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Low, startDate: "", todoListId: todolistID2},
    ]
  })
  //Tasks
  const removeTask = (taskId: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId) // перезапишим в этом объекте массив для нужного тудулиста с отфильтрованным массивом
    setTasks({...tasks})
  }
  const addTask = (title: string, todolistId: string) => {
    const task = {id: v1(), title: title, status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
      priority: TaskPriorities.Middle, startDate: "", todoListId: todolistId}
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    tasks[todolistId] = [task, ...todolistTasks] // перезапишим в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
    setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
  }
  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    let todolistTasks = tasks[todolistId]
    let task = todolistTasks.find(task => task.id === taskId)
    if (task) { // изменим таску, если она нашлась
      task.title = newTitle
      setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    }
  }
  const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    let task = todolistTasks.find(task => task.id === taskId) // найдем нужную таску
    if (task) { // изменим таску, если она нашлась
      task.status = status
      setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    }
  }

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: "", order: 0},
    {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0},
  ])
  //TodoLists
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId)) // добавим в стейт список тудулистов, id которых не равны тому, который нужно удалить
    delete tasks[todolistId] // удалим таски для этого тудулиста из второго стэйта, где мы отдельно храним таски
    setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
  }
  const addTodoList = (title: string) => {
    let newTodoListId = v1()
    let newTodoList: TodolistDomainType = {id: newTodoListId, title: title, filter: 'all', addedDate: "", order: 0}
    setTodolists([newTodoList, ...todolists])
    setTasks({
      ...tasks,
      [newTodoListId]: []
    })
  }
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    let todolist = todolists.find(todolist => todolist.id === todolistId)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }
  const changeTodolistFilter = (todolistId: string, filter: FilterValuesType ) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = filter
      setTodolists([...todolists])
    }
  }

  return (
    <div className="App">
      <AppHeader/>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map((todolist) => {
              let allTodolistTasks = tasks[todolist.id]
              let taskForTodoList = allTodolistTasks // в переменную tasksForTodolists копируем все наши таски

              if (todolist.filter === "active") {
                taskForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.New)
              }
              if (todolist.filter === "completed") {
                taskForTodoList = allTodolistTasks.filter(task => task.status === TaskStatuses.Completed)
              }
              return <Grid item>
                <Paper style={{padding: "10px"}}>
                  <TodoList key={todolist.id}
                            id={todolist.id}
                            title={todolist.title}
                            tasks={taskForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                            filter={todolist.filter}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
