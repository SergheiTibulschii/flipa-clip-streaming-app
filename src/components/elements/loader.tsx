import { LogoIcon } from '../icons.ts';
import clsx from 'clsx';

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  const cn = clsx(
    'fixed inset-0 flex items-center justify-center bg-dark',
    className
  );
  return (
    <div className={cn}>
      <LogoIcon />
    </div>
  );
};
