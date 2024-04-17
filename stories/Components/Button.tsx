import React from "react";

interface ButtonProps {
  defaultVariant?: boolean;
  backgroundColor?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  defaultVariant = true,
  size = 'default',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = defaultVariant ? 'storybook-button--default' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
      <style jsx>
        {`button {
          background-color: ${backgroundColor};
        }`}
      </style>
    </button>
  )
}