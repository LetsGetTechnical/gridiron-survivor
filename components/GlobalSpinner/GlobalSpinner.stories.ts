// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import GlobalSpinner from './GlobalSpinner';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof GlobalSpinner> = {
  title: 'Components/GlobalSpinner',
  component: GlobalSpinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A global spinner that shows the logo animating as a loader.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
