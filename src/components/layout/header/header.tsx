import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, LogoIcon } from '../../icons.ts';
import { Container } from '../container';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';

export const Header = () => {
  return (
    <nav>
      <Container>
        <div className="xxx flex items-center mt-6">
          <div className="basis-1/6">
            <IconButton variant="ghost">
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
