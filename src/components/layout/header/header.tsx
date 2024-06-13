import styles from './styles/index.module.scss';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CloseIcon, LogoIcon, SearchIcon } from '../../icons.ts';
import { Container } from '../container/container.tsx';
import { Link } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';

export const Header = () => {
  return (
    <nav className={styles.header}>
      <Container>
        <div className={styles.header__content}>
          <IconButton variant="ghost">
            <CloseIcon />
          </IconButton>
          <Link to={pageRoutes.home}>
            <LogoIcon />
          </Link>
          <IconButton variant="ghost">
            <SearchIcon />
          </IconButton>
        </div>
      </Container>
    </nav>
  );
};
