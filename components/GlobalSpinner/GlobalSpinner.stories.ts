// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Meta, StoryObj } from '@storybook/react';
import GlobalSpinner from './GlobalSpinner';

const globalspinner: Meta<typeof GlobalSpinner> = {
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

export default globalspinner;
type Story = StoryObj<typeof globalspinner>;

export const Default: Story = {};
