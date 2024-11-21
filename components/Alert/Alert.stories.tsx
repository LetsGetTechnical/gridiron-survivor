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
        component: `
The \`Alert\` component is a dynamic UI element from the Shadcn UI library, designed to display important notifications to users. It combines several subcomponents—\`AlertTitle\`, \`AlertDescription\`, and \`AlertDefault\`—into a cohesive \`AlertNotification\` component. This component is exported as \`<Alert variant={variant} message="Whatever message" />\`, making it easy to use across applications.

### Variants

- **Success**: Indicates successful operations, such as a successful user sign-in.
- **Error**: Alerts users to errors, like incorrect login information.
- **Warning**: Reserved for potential issues.
- **Default**: Used for general information.

### Usage

The \`Alert\` component is primarily used to provide users with visual feedback on the status of their actions, such as confirming successful operations or notifying them of errors. It is integrated with \`react-hot-toast\` to enable popup notifications, enhancing user experience by providing immediate feedback.

\`\`\`jsx
<Alert variant="success" message="This is a success alert" />
\`\`\`

### Props

- **variant**: Determines the type of alert, affecting its title and color. Options include 'success', 'error', 'warning', and 'default'.
- **message**: The content of the alert message, rendered within the \`AlertDescription\`.

### Integration with Toast

The component's notification functionality is powered by \`react-hot-toast\`, a package that handles popup notifications. By wrapping \`toast.custom()\` around \`<Alert variant={} message="" />\`, the component can display alerts as pop-up notifications, providing users with immediate visual feedback.`,
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