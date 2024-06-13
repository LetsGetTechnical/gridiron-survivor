import React, { ElementType, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  as: Tag = 'span',
  className,
  children,
  ...props
}) => {
  const baseClass = 'text-gray-900';
  const tagClasses: { [key: string]: string } = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
  };

  return (
    <Tag className={clsx(baseClass, tagClasses[Tag], className)} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
