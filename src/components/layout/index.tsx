import { Header } from './header/header.tsx';
import { BecomeCreator } from '../elements/become-creator';
import { PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren<{
  displayHeader?: boolean;
  displayBecomeCreator?: boolean;
}>;

export const MainLayout = ({
  displayBecomeCreator = true,
  displayHeader = true,
  children,
}: MainLayoutProps) => {
  return (
    <div className="flex flex-col w-full bg-dark">
      {displayHeader && <Header />}
      <main className="flex-1">{children}</main>
      {displayBecomeCreator && (
        <div className="mt-10">
          <BecomeCreator />
        </div>
      )}
    </div>
  );
};
