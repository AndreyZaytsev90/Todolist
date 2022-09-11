import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from '../AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: { // описывает пропсы
    addItem: {
      description: "Clicked inside form"
    },
  },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />; //образец компоненты, на ее основе создаем истории


export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  addItem: action('"Clicked inside form"')
};
