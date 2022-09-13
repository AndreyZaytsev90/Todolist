import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b',
  },
})

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}
export type D = {
  item: TodolistType
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

// @ts-ignore
export const todolistAPI = {
  //Todolists
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>('todo-lists')
    return promise
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<D>>('todo-lists', {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
  },

  //Tasks
  getTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    return promise
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}
