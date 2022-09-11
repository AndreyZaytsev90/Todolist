import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Task} from '../Task';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/Task',
  component: Task
} as ComponentMeta<typeof Task>;

const removeTaskHandler = action('Remove button inside Task was clicked')
const changeTaskStatusHandler= action('Status changed inside Task')
const changeTaskTitleHandler= action('Title changed inside Task')

const baseArgs = {
  removeTask: removeTaskHandler,
  changeTaskStatus: changeTaskStatusHandler,
  changeTaskTitle: changeTaskTitleHandler
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />; //образец компоненты, на ее основе создаем истории


export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  ...baseArgs,
  task: {id: '1', title: 'JS', isDone: true},
  todolistId: 'todolistId1'
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  ...baseArgs,
  task: {id: '1', title: 'JS', isDone: false},
  todolistId: 'todolistId1'
};