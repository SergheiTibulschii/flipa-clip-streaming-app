import { ButtonHTMLAttributes, CSSProperties, PropsWithChildren } from 'react';
import './styles/button.scss';
import clsx from 'clsx';
import { LoaderSvg } from '../../icons.ts';

export type ButtonBaseProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'ghost';
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  wide?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  isLoading?: boolean;
  isDisabled?: boolean;
}>;

export const ButtonBase = ({
  children,
  variant = 'primary',
  wide,
  onClick,
  type = 'button',
  className,
  isLoading,
  isDisabled,
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
    <button type={type} onClick={onClick} className={cls} disabled={isDisabled}>
      {!isLoading ? children : <LoaderSvg className="animate-spin" />}
    </button>
  );
};
