import { PropsWithChildren } from 'react';
import './styles/button.scss';
import clsx from 'clsx';

export type ButtonBaseProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text';
  className?: string;
  onClick?: () => void;
}>;

export const ButtonBase = ({
  children,
  variant = 'primary',
  onClick,
  /*button type*/
  className,
}: ButtonBaseProps) => {
  const cls = clsx('btn', className, {
    'btn--primary': variant === 'primary',
    'btn--secondary': variant === 'secondary',
    'btn--tertiary': variant === 'tertiary',
    'btn--text': variant === 'text',
  });

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
};
