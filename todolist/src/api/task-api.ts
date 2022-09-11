import axios from 'axios'

const todolistId1 = '60f64e2e-eb47-4c32-bcf2-90b585289b39'
const todolistId2 = '469c51c1-6078-4684-93a9-2a6d94d28648'
const todolistId3 = 'b89d8b6b-acb7-465c-8a85-a17592753c75'

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId1}`,
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b',
  },
})

/*export type ResponseTaskType<T> = {
  data: T;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  resultCode: number;
}

export type T = {
  item: TaskType;
}

export type TaskType = {
  id: string;
  title: string;
  todolistId: string;
  order: number;
  status: number;
  priority: number;
  addedDate: Date
}*/

export const taskAPI = {
  /*getTasks() {
    const promise = instance.get<Array<TaskType>>('tasks')
    return promise
  },
  createTask(title: string) {
    return instance.post<ResponseTaskType<T>>('tasks', {title: title})
  },
  deleteTask(taskId: string) {
    return instance.delete<ResponseTaskType<{}>>(`tasks/${taskId}`)
  },
  updateTask(taskId: string, title: string) {
    return instance.put<ResponseTaskType<{}>>(`tasks/${taskId}`, {title: title})
  }*/
}
