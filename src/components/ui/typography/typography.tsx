import { createElement, PropsWithChildren } from 'react';
import './styles/typography.scss';
import clsx from 'clsx';

type TypographyProps = PropsWithChildren<{
  variant: 'h4' | 'body1';
  className?: string;
}>;

export const Typography = ({
  variant,
  className,
  children,
}: TypographyProps) => {
  const tagMap = {
    h4: 'h4',
    body1: 'p',
  };
  const cns = clsx('text', className, {
    'text--h4': variant === 'h4',
    'text--body1': variant === 'body1',
  });

  return createElement(tagMap[variant], { className: cns }, children);
};
