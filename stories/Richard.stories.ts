import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Richard from './Richard';

const meta = {
  title: 'Documentations/Richard',
  component: Richard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
