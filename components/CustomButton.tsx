import React from "react";
import { Button } from "./ui/Button";
import { LucideProps } from "lucide-react";
import { cn } from "../lib/utils";

type ButtonProps = {
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
  label?: string;
  icon?: React.ComponentType<LucideProps & { className?: string }>;
};

export const CustomButton = ({
  variant,
  size,
  label,
  icon: IconComponent,
  className,
  onClick,
}: ButtonProps) => {
  const iconClassName = cn(
    { "mr-2 h-4 w-4": label && IconComponent },
    { "h-4 w-4": IconComponent && !label }
  );

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      {IconComponent && <IconComponent className={iconClassName} />}
      {label}
    </Button>
  );
};
