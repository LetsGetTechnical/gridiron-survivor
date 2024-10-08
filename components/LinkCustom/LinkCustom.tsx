// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Link from 'next/link';
import React, { JSX } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const linkCustomVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'underline underline-offset-4 hover:text-primary-muted transition-colors',
        primaryButton: 'bg-primary text-primary-foreground hover:bg-primary-muted text-sm font-medium',
        disabledPrimaryButton: 'bg-primary text-primary-foreground hover:bg-primary-muted text-sm font-medium opacity-50 cursor-not-allowed',
        secondaryButton: 'bg-secondary text-secondary-foreground hover:bg-secondary-muted text-sm font-medium',
        disabledSecondaryButton: 'bg-secondary text-secondary-foreground hover:bg-secondary-muted text-sm font-medium opacity-50 cursor-not-allowed',
      },
      size: {
        default: 'h-fit w-fit',
        defaultButton: 'h-10 px-4 py-2',
        smButton: 'h-9 rounded-md px-3',
        lgButton: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

interface ILinkCustomProps extends VariantProps<typeof linkCustomVariants> {
  children?: React.ReactNode;
  className?: string;
  dataTestidProp?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

/**
 * Custom link component
 * @param props - the props for LinkCustom
 * @param props.children - the children of the link
 * @param props.className - the class name of the link
 * @param props.dataTestidProp - the data-testid of the link
 * @param props.href - the url of the link
 * @param props.onClick - the click event of the link
 * @param props.size - the size of the link
 * @param props.variant - the variant of the link
 * @returns {React.JSX.Element} - A link element
 */
const LinkCustom = ({
  children,
  className,
  dataTestidProp,
  href,
  onClick,
  size,
  variant,
}: ILinkCustomProps): JSX.Element => {
  return (
    <Link
      className={cn(linkCustomVariants({ size, variant }), className)}
      data-testid={dataTestidProp}
      href={href}
      onClick={onClick}
      passHref
    >
      {children}
    </Link>
  );
};

export default LinkCustom;
