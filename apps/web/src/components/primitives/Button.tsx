import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'ghost';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  'aria-label'?: string;
}

interface AsLink extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface AsAnchor extends BaseProps {
  href: string;
  to?: never;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface AsButton extends BaseProps {
  to?: never;
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export type ButtonProps = AsLink | AsAnchor | AsButton;

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-body-sm font-medium transition-colors duration-hover disabled:cursor-not-allowed disabled:opacity-60';

const VARIANT: Record<ButtonVariant, string> = {
  /* Not bg-accent: white on the brand blue lands at exactly 4.50:1, which is on the AA line
     rather than over it. accent-solid sits at 5.9:1 and accent-hover at 4.7:1. */
  primary: 'bg-accent-solid text-ink-on-accent hover:bg-accent-hover',
  ghost: 'border border-hairline/15 text-ink-primary hover:border-accent/50 hover:bg-bg-elevated',
};

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className } = props;
  const classes = cn(BASE, VARIANT[variant], className);
  const label = props['aria-label'];

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} aria-label={label}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const external = props.href.startsWith('http');
    return (
      <a
        href={props.href}
        className={classes}
        aria-label={label}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = props as AsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={label}>
      {children}
    </button>
  );
}
