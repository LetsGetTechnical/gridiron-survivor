// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import React, { JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { X } from 'lucide-react';

import { cn } from '@/utils/utils';

/**
 * Drawer component.
 * @param props - The props
 * @param props.shouldScaleBackground - Should scale background
 * @returns The Drawer component
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  shouldScaleBackground?: boolean;
}): JSX.Element => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    direction="right"
    {...props}
  />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-background/80', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    className?: string;
  }
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 left-auto right-0 top-0 z-50 mt-0 flex h-auto w-4/5 flex-col gap-4 rounded-none border-l border-border bg-background px-4 md:w-2/5 lg:w-1/5',
        className,
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

/**
 * Drawer header component.
 * @param props - The props
 * @param props.className - The class name
 * @returns The Drawer header component
 */
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}): JSX.Element => (
  <div
    className={cn(
      'grid h-16 items-center gap-1.5 px-0 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

/**
 * Drawer footer component.
 * @param props - The props
 * @param props.className - The class name
 * @returns The Drawer footer component
 */
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}): JSX.Element => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <div className="flex items-center">
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        'mr-auto text-lg font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    />

    <DrawerClose>
      <X />
    </DrawerClose>
  </div>
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
