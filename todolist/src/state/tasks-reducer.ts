import {v1} from "uuid";
import {AddTodoListType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TasksStateType, TasksType} from "../AppWithRedux";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task
                )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.newTaskTitle}
                        : task
                )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            /* const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId1]
            return stateCopy*/
            let {[action.payload.todolistId]: [], ...rest} = {...state} // удаление через де структуризацию объекта
            return rest
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.payload.todolist.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        default:
            /*throw new Error('I don\'t understand this type')*/
            return state
    }
}

type TasksReducerType =
    RemoveTaskType |
    AddTaskType |
    ChangeTaskTitleType |
    ChangeTaskStatusType |
    AddTodoListType |
    RemoveTodolistType |
    SetTodolistType |
    SetTaskType


type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type SetTaskType = ReturnType<typeof setTasksAC>


// ActionCreators
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {todolistId, taskId}
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todolistId, taskId, isDone}
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, newTaskTitle}
    } as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TasksType>) => {
    return {
        type: "SET-TASKS",
        payload: {todolistId, tasks}
    } as const
}

// ThunkCreators
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}
