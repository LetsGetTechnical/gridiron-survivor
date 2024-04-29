import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './NavDrawer';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Interface that opens displaying all menu items.`,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;
