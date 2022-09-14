import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppHeader} from "./AppHeader";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
  addTodoListAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, FilterValuesType,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";



function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
    {id: todolistID1, title: 'What to learn', filter: 'all',addedDate: "", order: 0},
    {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0},
  ])
  //TodoLists
  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolist(action)
  }
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle)
    dispatchToTodolist(action)
  }
  const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
    const action = changeTodolistFilterAC(todolistId, filter)
    dispatchToTodolist(action)
  }

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
  const removeTask = (todolistId: string, taskId: string) => {
    const action = removeTaskAC(todolistId, taskId)
    dispatchToTasks(action)
  }
  const addTask = (todolistId: string, title: string) => {
    const action = addTaskAC(todolistId, title)
    dispatchToTasks(action)
  }
  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const action = changeTaskTitleAC(todolistId, taskId, newTitle)
    dispatchToTasks(action)
  }
  const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
    const action = changeTaskStatusAC(todolistId, taskId, status)
    dispatchToTasks(action)
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
