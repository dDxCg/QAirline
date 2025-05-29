import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className,
  ...props
}) => {
  const baseStyles = 'w-full mx-auto px-4 sm:px-6 lg:px-8';
  
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };

  return (
    <div
      className={twMerge(
        baseStyles,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 