import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

  console.log("EditableSpan is called")

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }

  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const changeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  return editMode
    ? <TextField value={title} onBlur={activateViewMode} onChange={changeTaskTitle} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.value}</span>

})

