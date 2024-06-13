import styles from './styles/index.module.scss';
import { BecomeCreatorGirlSvg } from '../../icons.ts';
import { BecomeCreatorBgSvg } from '../../icons.ts';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { Button } from '../../ui/button';

export const BecomeCreator = () => {
  return (
    <div className={styles['become-creator']}>
      <div className={styles['become-creator__background']}>
        <BecomeCreatorGirlSvg className={styles['become-creator__svg-girl']} />
        <BecomeCreatorBgSvg className={styles['become-creator__svg-bg']} />
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
