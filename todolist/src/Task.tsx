import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/todolist-api";


type TaskPropsType = {
  todolistId: string
  task: TaskType
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

  const removeTaskHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id), [props])
  const changeTaskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = event.currentTarget.checked
    props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
  }, [props])
  const changeTaskTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
  }, [props])

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color='primary'
        onChange={changeTaskStatusHandler}/>

      <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler}/>

      <IconButton onClick={removeTaskHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})