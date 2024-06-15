import { ButtonBase, ButtonBaseProps } from './button-base.tsx';
import { PropsWithChildren, ReactNode } from 'react';

export type ButtonProps = PropsWithChildren<
  ButtonBaseProps & {
    iconBefore?: ReactNode;
    iconAfter?: ReactNode;
  }
>;

export const Button = ({
  variant,
  children,
  iconBefore,
  iconAfter,
  className,
  type,
  wide,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonBase
      wide={wide}
      type={type}
      variant={variant}
      onClick={onClick}
      className={className}
    >
      {iconBefore}
      {children}
      {iconAfter}
    </ButtonBase>
  );
};
