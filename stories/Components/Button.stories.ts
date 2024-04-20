import type { Meta, StoryObj } from '@storybook/react';
import { fn } from "@storybook/test";
import { Button } from '../../components/Button/button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Primary UI component for user interaction.`,
      },
    },
  },
  argTypes: {
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: {type: 'radio'},
      description: "How large should the button be?",
    },
    variant: {
      description: 'Which type of button?'
    },
    label: { description: "Button text content" },
    onClick: { description: "Click handler" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    label: "Click Me",
  },
  
};