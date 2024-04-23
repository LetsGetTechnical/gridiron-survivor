import type { Meta, StoryObj } from "@storybook/react";
import Logo from "../../components/logo/Logo";
import ColoredOutlineLogo from '../../public/assets/logo-colored-outline.svg';

const meta = {
  title: "Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Displays the Gridiron Survivor logo",
      },
    },
  },
  argTypes: { 
    src: { description: "Logo image source"},
    className: { description: "Additional logo classname"},
  }
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: ColoredOutlineLogo,
  }
};