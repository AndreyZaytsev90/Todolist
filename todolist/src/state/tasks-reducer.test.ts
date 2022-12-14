import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import { TasksStateType } from '../App'
import {addTodoListAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
  startState = {
    'todolistId1': [
      {id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"},
      {id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"},
      {id: '3', title: 'React', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"},
      {id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"},
      {id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"}
    ]
  }
})

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC('todolistId2','2' )
  const endState = tasksReducer(startState, action)
  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS',  status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"},
      {id: '2', title: 'JS',  status: TaskStatuses.Completed, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"},
      {id: '3', title: 'React',  status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId1"}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"},
      {id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '', deadline: '', order: 0, description: "",
        priority: TaskPriorities.Middle, startDate: "", todoListId: "todolistId2"}
    ]
  })
})

test('correct task should be added to correct array', () => {
  const action = addTaskAC('todolistId2', 'juce')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New )
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test("title of task should be changed", () => {
  const action = changeTaskTitleAC('todolistId2', '3', 'coffee')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1'][2].title).toBe('React')
  expect(endState['todolistId2'][2].title).toBe('coffee')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodoListAC('new todolist')
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC('todolistId2')
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()
})
