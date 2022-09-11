import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppHeader} from "./AppHeader";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
  addTodoListAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, fetchTodolistsThunk,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: Array<TasksType>
}

function AppWithRedux() {

  const dispatch = useDispatch() //получает action и отправляет в стор
  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists) // достаем из глобально стэйта масссив тодулистов
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // достаем из глобально стэйта таски

  //Todolists
  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
  }, [])
  const addTodoList = useCallback((title: string) => {
    const action = addTodoListAC(title)
    dispatch(action)
  }, [])
  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle)
    dispatch(action)
  }, [])
  const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    const action = changeTodolistFilterAC(todolistId, filter)
    dispatch(action)
  }, [])
  //Tasks
  const removeTask = useCallback((todolistId: string, taskId: string) => {
    const action = removeTaskAC(todolistId, taskId)
    dispatch(action)
  }, [])
  const addTask = useCallback((todolistId: string, title: string) => {
    const action = addTaskAC(todolistId, title)
    dispatch(action)
  }, [])
  const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
    const action = changeTaskTitleAC(todolistId, taskId, newTitle)
    dispatch(action)
  }, [])
  const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
    const action = changeTaskStatusAC(todolistId, taskId, isDone)
    dispatch(action)
  }, [])

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodolistsThunk)
  }, [])

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

              let taskForTodoList = tasks[todolist.id] // в переменную tasksForTodolists копируем все наши таски

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

export default AppWithRedux;
