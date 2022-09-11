import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableSpan } from '../EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: { // описывает пропсы
    onClick: {
      description: "Button inside form clicked"
    },
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />; //образец компоненты, на ее основе создаем истории

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
  onChange: action("EditableSpan value changed")
};
