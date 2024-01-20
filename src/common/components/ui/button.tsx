import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/common/lib/utils';
import { useHover, usePress, useFocusVisible } from '@react-aria/interactions';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        custom: 'disabled:bg-inherit',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        custom: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface AriaButtonProps extends ButtonProps {
  hoverStyle?: string | undefined;
  pressedStyle?: string | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, AriaButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      hoverStyle,
      pressedStyle,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { isHovered, hoverProps } = useHover({});
    const { isPressed, pressProps } = usePress({});
    const { isFocusVisible } = useFocusVisible();
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isHovered ? hoverStyle : '',
          isPressed ? pressedStyle : '',
          !isFocusVisible ? 'outline-none' : '',
        )}
        ref={ref}
        {...hoverProps}
        {...pressProps}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
