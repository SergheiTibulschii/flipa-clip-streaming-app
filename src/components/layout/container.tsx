import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type ContainerProps = PropsWithChildren<unknown>;

export const Container = ({ children }: ContainerProps) => {
  const cln = clsx('container', 'm-auto max-w-screen-md px-4 md:px-8');
  return <div className={cln}>{children}</div>;
};
