import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../AppWithRedux";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

let initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: TodolistsReducerType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            /*let newState = [{...state}]
            newState.filter(todolist => todolist.id !== action.payload)*/
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case 'ADD-TODOLIST':
            let newTodoList: TodolistsType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            /*  let todolist = todolists.find(todolist => todolist.id === todolistId)
              if (todolist) {
                todolist.title = newTitle
                setTodolists([...todolists])
              }*/
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.newTodolistTitle}
                : tl)
        case 'CHANGE-TODOLIST-FILTER':
            /*let todolist = todolists.find(tl => tl.id === todolistId)
            if (todolist) {
              todolist.filter = filter
              setTodolists([...todolists])*/
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.newFilter}
                : tl)
        case "SET-TODOLIST" :
            return action.payload.todolist.map((tl) => ({...tl, filter: "all"}))
        default:
            /*throw new Error('I don\'t understand this type')*/
            return state
    }
}

export type TodolistsReducerType =
    RemoveTodolistType |
    AddTodoListType |
    ChangeTodolistTitleType |
    ChangeTodolistFilterType |
    SetTodolistType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>


export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId: todolistId1}
    } as const
}

export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1()}
    } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId: todolistId2, newTodolistTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId: todolistId2, newFilter}
    } as const
}

export const setTodolistAC = (todolist: Array<TodolistType>) => {
    return {
        type: "SET-TODOLIST",
        payload: {todolist: todolist}
    } as const
}

//Санка
export const fetchTodolistsThunk = (dispatch: Dispatch)=> {
    // Внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistAPI.getTodolists()
        .then((response) => {
            // и диспатчить экшены (Action) или другие санки (Thunk)
            dispatch(setTodolistAC(response.data))
        })
}