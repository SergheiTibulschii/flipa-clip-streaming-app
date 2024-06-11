import { createElement, PropsWithChildren } from 'react';
import './styles/typography.scss';
import clsx from 'clsx';

type TypographyProps = PropsWithChildren<{
  variant: 'h4' | 'body1';
}>;

export const Typography = ({ variant, children }: TypographyProps) => {
  const tagMap = {
    h4: 'h4',
    body1: 'p',
  };
  const className = clsx('text', {
    'text--h4': variant === 'h4',
    'text--body1': variant === 'body1',
  });

  return createElement(tagMap[variant], { className }, children);
};
