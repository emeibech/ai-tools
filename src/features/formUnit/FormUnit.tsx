import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { cn } from '@/common/lib/utils';
import type { FormUnitProps } from '@/types/features';

export default function FormUnit({
  label,
  description,
  children,
  labelAnimator,
}: FormUnitProps) {
  return (
    <FormItem className="relative">
      <FormLabel
        className={cn(
          labelAnimator.getAnimationStyles(),
          'absolute left-2 px-1',
          'font-normal',
          'bg-background',
        )}
      >
        {label}
      </FormLabel>

      <FormMessage className="absolute -top-6 text-xs font-normal" />

      <FormControl
        onFocus={labelAnimator.onFocus}
        onBlur={labelAnimator.onBlur}
      >
        {children}
      </FormControl>

      <FormDescription className="absolute -bottom-5 px-1">
        {description}
      </FormDescription>
    </FormItem>
  );
}
