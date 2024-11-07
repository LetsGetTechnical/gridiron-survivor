// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The Alert component is a versatile UI element designed to display important messages to users. It is built to handle various types of alerts, each with its own visual style to convey different levels of importance or types of information.`,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['default', 'error', 'warning', 'success'],
      control: { type: 'radio' },
      description: 'The variant of the alert.',
    },
    children: {
      description: 'Content of the alert message.',
    },
  },
  args: {
    children: 'This is an alert message',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'This is an error alert',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This is a warning alert',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success alert',
  },
};