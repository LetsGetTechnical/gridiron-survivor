import type { Meta, StoryObj } from '@storybook/react';
import Nav from './Nav';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Primary UI component for navigating the app.`,
      },
    },
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
