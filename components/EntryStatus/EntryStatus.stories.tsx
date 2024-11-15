import type { Meta, StoryObj } from '@storybook/react';
import { EntryStatus } from './EntryStatus';

const meta: Meta<typeof EntryStatus> = {
  title: 'Components/EntryStatus',
  component: EntryStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`EntryStatus\` component is a UI element designed to inform users about the status of their LeagueEntry, indicating whether it is currently "alive" or "eliminated". It uses a simple visual cue with text and background color to convey the status.

### Usage

The \`EntryStatus\` component is used to provide users with a clear indication of their entry status in a league. It displays a rounded badge with text indicating the current status.

\`\`\`jsx
<EntryStatus isEliminated={false} />
\`\`\`

### Props

- **isEliminated**: A boolean prop that determines the status of the entry. If \`true\`, the entry is marked as "eliminated" with a corresponding background color. If \`false\`, it is marked as "alive".

### Styling

The component uses utility classes to style the badge, changing the background color based on the \`isEliminated\` prop. The text is styled to be uppercase and small for a concise display.
`,
      },
    },
  },
  argTypes: {
    isEliminated: {
      control: { type: 'boolean' },
      description: 'Determines if the entry is marked as eliminated.',
    },
  },
  args: {
    isEliminated: false,
  },
} satisfies Meta<typeof EntryStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Alive: Story = {
  args: {
    isEliminated: false,
  },
};

export const Eliminated: Story = {
  args: {
    isEliminated: true,
  },
};