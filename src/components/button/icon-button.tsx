import { ButtonBase, ButtonBaseProps } from './button-base.tsx';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export type IconButtonProps = PropsWithChildren<ButtonBaseProps>;

export const IconButton = ({
  variant,
  children,
  className,
  onClick,
}: IconButtonProps) => {
  const classes = clsx('btn--icon', className);

  return (
    <ButtonBase variant={variant} className={classes} onClick={onClick}>
      {children}
    </ButtonBase>
  );
};
