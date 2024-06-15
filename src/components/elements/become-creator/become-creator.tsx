import styles from './styles/index.module.scss';
import { BecomeCreatorSvg } from '../../icons.ts';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';

export const BecomeCreator = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['become-creator']}>
      <div className={styles['become-creator__background']}>
        <div className="relative flex justify-center">
          <BecomeCreatorSvg className="absolute w-[744px] h-[415px] bottom-0 z-0 ml-5" />
        </div>
      </div>
      <div className={styles['become-creator__content']}>
        <Typography variant="h4">{text.becomeCreator}</Typography>
        <Typography className="max-w-[80%] md:max-w-[396px]" variant="body1">
          {text.becomeCreatorMessage}
        </Typography>
        <Button
          className="mt-5"
          onClick={() => {
            navigate(pageRoutes.creator.become);
          }}
        >
          {text.explore}
        </Button>
      </div>
    </div>
  );
};
