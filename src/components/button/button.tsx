import { ButtonBase, ButtonBaseProps } from './button-base.tsx';
import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<ButtonBaseProps>;

export const Button = ({
  variant,
  children,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonBase variant={variant} onClick={onClick} className={className}>
      {children}
    </ButtonBase>
  );
};
