import React, {ChangeEvent, useCallback} from 'react';

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {FilterValuesType, TasksType} from "./AppWithRedux";
import {Task} from "./Task";


type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TasksType>
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValuesType,) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  filter: FilterValuesType
}

const TodoList = React.memo((props: TodoListPropsType) => {

  console.log("Todolist called")

  const addTask = useCallback((title: string) => {
    props.addTask(props.id, title)
  }, [props])

  const onAllChangeFilter = useCallback(() => props.changeFilter(props.id, "all"), [props])
  const onActiveChangeFilter = useCallback(() => props.changeFilter(props.id, "active"), [props])
  const onCompletedChangeFilter = useCallback(() => props.changeFilter(props.id, "completed"), [props])
  const removeTodolistHandler = useCallback(() => props.removeTodolist(props.id), [props])

  const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }, [props])

  let taskForTodoList = props.tasks // в переменную tasksForTodolists копируем все наши таски

  if (props.filter === "active") {
    taskForTodoList = props.tasks.filter(task => !task.isDone)
  }
  if (props.filter === "completed") {
    taskForTodoList = props.tasks.filter(task => task.isDone)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={onChangeTodolistTitleHandler}/>
        {/*<button onClick={removeTodolistHandler}>X</button>*/}
        <IconButton onClick={removeTodolistHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <div>
        {
          taskForTodoList.map(task => {
            return (
              <Task key={task.id}
                    todolistId={props.id}
                    task={task}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
              />
            )
          })}
      </div>
      <div>
        <Button
          onClick={onAllChangeFilter}
          color='secondary'
          variant={props.filter === "all" ? "outlined" : 'text'}>All</Button>
        <Button
          onClick={onActiveChangeFilter}
          color='primary'
          variant={props.filter === "active" ? "outlined" : 'text'}>Active</Button>
        <Button
          onClick={onCompletedChangeFilter}
          color='success'
          variant={props.filter === "completed" ? "outlined" : 'text'}>Completed</Button>
      </div>
    </div>
  );
})

export default TodoList;