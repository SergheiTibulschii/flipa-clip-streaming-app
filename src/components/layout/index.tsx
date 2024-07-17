import { Header } from './header/header.tsx';
import { BecomeCreator } from '../elements/become-creator';
import { PropsWithChildren } from 'react';
import { sendMessage } from '../../lib/utils/tracking.ts';
import { useMatches } from 'react-router-dom';
import { hadRouterHandle, hasRouterData } from '../../lib/utils/predicates.ts';

type MainLayoutProps = PropsWithChildren<{
  displayHeader?: boolean;
  displayBecomeCreator?: boolean;
}>;

export const MainLayout = ({
  displayBecomeCreator = true,
  displayHeader = true,
  children,
}: MainLayoutProps) => {
  const matches = useMatches();

  const handleBecomeCreatorClick = () => {
    const [match] = matches;
    const trackParams: Record<string, string> = {
      action: 'become_creator',
    };

    if (match) {
      if (hadRouterHandle(match.handle)) {
        if (match.handle?.from) {
          trackParams.from = match.handle.from;
        }

        if (match.handle?.trackType) {
          trackParams.type = match.handle.trackType;
        }
      }

      if (hasRouterData(match.data)) {
        if (match.data.id) {
          trackParams.id = String(match.data.id);
        }
      }
    }

    sendMessage({
      event: 'flips_click',
      params: trackParams,
    });
  };

  return (
    <div className="flex flex-col w-full bg-dark">
      {displayHeader && <Header />}
      <main className="flex-1">{children}</main>
      {displayBecomeCreator && (
        <div className="mt-10">
          <BecomeCreator onClick={handleBecomeCreatorClick} />
        </div>
      )}
    </div>
  );
};
