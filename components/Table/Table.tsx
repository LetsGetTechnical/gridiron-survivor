// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { cn } from '@/utils/utils';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn('table-auto border border-border rounded-md', className)}
    {...props}
    data-testid="data-table"
  />
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('border-b border-border text-left', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn('border-b border-border text-left', className)}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'border-b border-border px-3 py-2 gap-2 font-semibold text-sm text-muted-foreground',
      className,
      'last:w-[80px]',
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('w-80 h-12 px-3 py-2', className, 'last:w-20')}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & { className?: string }
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
};
