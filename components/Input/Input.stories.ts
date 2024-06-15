// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A basic input field component for user text input.',
      },
    },
  },
  argTypes: {
    type: { description: 'Type of value the input accepts' },
    placeholder: { description: 'Placeholder text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Email',
  },
};
