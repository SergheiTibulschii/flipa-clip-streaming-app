import styles from './styles/index.module.scss';
import { BecomeCreatorSvg } from '../../icons.ts';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { Button } from '../../ui/button';

export const BecomeCreator = () => {
  return (
    <div className={styles['become-creator']}>
      <div className={styles['become-creator__background']}>
        <div className="relative aspect-[744/485] w-full min-h-[455px]">
          <BecomeCreatorSvg className="absolute min-w-[744px] min-h-[485px] bottom-0 z-0 ml-5 -translate-x-1/2 left-1/2 lg:w-full lg:h-full" />
        </div>
      </div>
      <div className={styles['become-creator__content']}>
        <Typography variant="h4">{text.becomeCreator}</Typography>
        <Typography className="max-w-[80%] md:max-w-[396px]" variant="body1">
          {text.becomeCreatorMessage}
        </Typography>
        <Button className="mt-5">{text.explore}</Button>
      </div>
    </div>
  );
};
