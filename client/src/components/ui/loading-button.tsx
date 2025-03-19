import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './button';
import { Spinner } from './spinner';

function LoadingButton({
  children,
  isLoading = false,
  ...props
}: React.ComponentProps<'button'> & {
  isLoading?: boolean;
}) {
  return (
    <Button {...props}>
      <Spinner className="text-background" show={isLoading} size="small" />
      {children}
    </Button>
  );
}

export { LoadingButton, buttonVariants };
