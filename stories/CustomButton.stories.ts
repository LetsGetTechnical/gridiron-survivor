import type { Meta, StoryObj } from "@storybook/react";
import { CustomButton } from "../components/CustomButton";
import { Mail } from "lucide-react";
import { ChevronRight } from "lucide-react";

const meta = {
  title: "Gridiron Survivor/Button",
  component: CustomButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Primary UI component for user interaction",
      },
    },
  },
  argTypes: {
    size: {
      options: ["default", "sm", "lg"],
      control: { type: "radio" },
      description: "How large should the button be?",
    },
    variant: { description: "Which type of button?" },
    label: { description: "Button contents" },
    className: { description: "Optional classname" },
    icon: { description: "Lucide icon" },
    onClick: { description: "Optional click handler" },
  },
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    size: "default",
    label: "Click me",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
    label: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    label: "Outline",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    label: "Destructive",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    label: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    label: "Link",
  },
};

export const icon: Story = {
  argTypes: {
    size: {
      options: ["icon"],
      control: { type: "radio" },
    },
  },
  args: {
    variant: "default",
    size: "icon",
    icon: ChevronRight,
  },
};

export const labelWithIcon: Story = {
  args: {
    variant: "default",
    size: "default",
    label: "Login with Email",
    icon: Mail,
  },
};
