import Link from 'next/link';

import { cnJoin, cn } from '@/utils/formatting';

type ButtonProps = {
  element: 'button' | 'a';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
} & (React.ComponentPropsWithoutRef<'button'> | React.ComponentPropsWithoutRef<'a'>);

export default function Button({
  element,
  className,
  disabled,
  children,
  href,
  ...rest
}: ButtonProps) {
  if (element === 'button') {
    return (
      <button
        className={cn(twButton, className)}
        disabled={disabled}
        {...(rest as React.ComponentPropsWithoutRef<'button'>)}>
          {children}
      </button>
    );
  } else {
    return (
      <Link
        className={cn(twButton, className)}
        aria-disabled={disabled}
        href={href as string}
        {...(rest as React.ComponentPropsWithoutRef<'a'>)}>
          {children}
      </Link>
    );
  }
}

const twButton = cnJoin(`
  h-8 px-4 inline-flex justify-center items-center
  text-black/60 whitespace-nowrap text-sm font-medium
  border-black/10 border rounded-md transition-all
  hover:text-black
  hover:border-black/15
`);
