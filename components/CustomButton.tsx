import React from "react";
import { Button } from "./ui/button";
import { LucideProps } from "lucide-react";

interface ButtonProps {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
  icon?: React.ComponentType<LucideProps & { className?: string }>;
  onClick?: () => void;
}

export const CustomButton = ({
  label,
  icon: IconComponent,
  className,
  ...props
}: ButtonProps) => {
  let buttonClassName = className || "";
  let iconClassName = "";

  if (label && IconComponent) {
    buttonClassName += " mr-2";
    iconClassName = "mr-2 h-4 w-4";
  } else if (IconComponent) {
    iconClassName = "h-4 w-4";
  }

  return (
    <Button {...props} className={buttonClassName}>
      {IconComponent && <IconComponent className={iconClassName} />}
      {label && label}
    </Button>
  );
};
