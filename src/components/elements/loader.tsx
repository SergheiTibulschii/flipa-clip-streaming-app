import { LogoIcon } from '../icons.ts';

type LoaderProps = {};

export const Loader = ({}: LoaderProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark">
      <LogoIcon />
    </div>
  );
};
