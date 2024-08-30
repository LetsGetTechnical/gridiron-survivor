// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

"use client"

import { cn } from "@/utils/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

const labelTextVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const LabelText = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelTextVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelTextVariants(), className)}
    {...props}
  />
))
LabelText.displayName = LabelPrimitive.Root.displayName

export { LabelText }
