import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b',
  },
})

export type TodolistType = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
  items: T
}

export type D = {
  item: TodolistType
}

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
}

export type T = {
  items: TaskType;
}

export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  addedDate: Date;
}

export type GetTasksResponse = {
  error: string | null;
  totalCount: number
  items: TaskType[]
}

type UpdateTasksModelType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
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
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<UpdateTasksModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
  }
}
