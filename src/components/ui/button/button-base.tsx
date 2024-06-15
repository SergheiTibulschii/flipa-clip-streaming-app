import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './styles/button.scss';
import clsx from 'clsx';

export type ButtonBaseProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'ghost';
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  wide?: boolean;
  onClick?: () => void;
}>;

export const ButtonBase = ({
  children,
  variant = 'primary',
  wide,
  onClick,
  type = 'button',
  className,
}: ButtonBaseProps) => {
  const cls = clsx('btn', className, {
    'btn--primary': variant === 'primary',
    'btn--secondary': variant === 'secondary',
    'btn--tertiary': variant === 'tertiary',
    'btn--text': variant === 'text',
    'btn--ghost': variant === 'ghost',
    'w-full': wide,
  });

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
};
