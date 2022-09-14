import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store/store";
import {v1} from "uuid";
import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: "", order: 0},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: "", order: 0}
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "", priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"},
      {id: v1(), title: 'JS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "", priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"}
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "", priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"},
      {id: v1(), title: 'React Book', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "", priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"}
    ]
  }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {  // HOC, обертывает компоненту в <Provider>
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

