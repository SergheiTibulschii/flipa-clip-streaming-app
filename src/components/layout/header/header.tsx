import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, LogoIcon } from '../../icons.ts';
import { Container } from '../container';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import { sendMessage } from '../../../lib/utils/tracking.ts';
import { useEffect, useRef } from 'react';

export const Header = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const handleResize = () => {
        const height = ref.current!.clientHeight;
        const main = document.documentElement.querySelector('main');

        if (main) {
          main.style.marginTop = `${height}px`;
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleClose = () => {
    sendMessage(
      {
        action: 'close',
      },
      'action'
    );
  };

  return (
    <nav
      style={{
        top: 'env(safe-area-inset-top, 0px)',
      }}
      className="sticky z-10 bg-dark left-0 right-0 isolate"
      ref={ref}
    >
      <Container>
        <div className="flex items-center">
          <div className="basis-1/6">
            <IconButton onClick={handleClose} variant="ghost">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="basis-4/6 flex items-center justify-center">
            <Link to={pageRoutes.home}>
              <LogoIcon />
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};
