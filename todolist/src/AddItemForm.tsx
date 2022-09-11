import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

  console.log("AddItemForm is called")

  let [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === "Enter") {
      addItem()
    }
  }

  return (
    <div>
      <TextField variant="outlined"
                 value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 error={!!error}
                 label="Title"
                 helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox/>
      </IconButton>
    </div>
  );
})

