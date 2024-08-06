import styles from './styles/index.module.scss';
import { BecomeCreatorSvg } from '../../icons.ts';
import { Typography } from '../../ui/typography';
import { text } from '../../../lib/text.ts';
import { Button } from '../../ui/button';
import { useMatches, useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../../lib/page-routes.ts';
import {
  hadRouterHandle,
  hasRouterData,
} from '../../../lib/utils/predicates.ts';
import { sendMessage } from '../../../lib/utils/tracking.ts';

export const BecomeCreator = () => {
  const navigate = useNavigate();
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
          trackParams.id = match.data.id;
        }
      }
    }

    sendMessage({
      event: 'flips_click',
      params: trackParams,
    });
  };

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
            handleBecomeCreatorClick();
            navigate(pageRoutes.creator.become);
          }}
        >
          {text.share}
        </Button>
      </div>
    </div>
  );
};
