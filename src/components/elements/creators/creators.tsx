import styles from './styles/index.module.scss';
import { text } from '../../../lib/text.ts';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CaretDownIcon } from '../../icons.ts';
import { useState } from 'react';
import clsx from 'clsx';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import AvatarImg from '../../../assets/avatar.png';

export const Creators = () => {
  const [isOpened, setIsOpened] = useState(false);
  const gridCln = clsx(styles.creators__flex, {
    'flex-wrap': isOpened,
    'overflow-hidden': !isOpened,
  });

  const togglePanel = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={styles.creators}>
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold leading-1.5">{text.creators}</div>
        <IconButton onClick={togglePanel} variant="secondary">
          <CaretDownIcon
            className={`transition-transform ${isOpened ? 'rotate-180' : 'rotate-0'}`}
          />
        </IconButton>
      </div>
      <div className={gridCln}>
        {Array.from({ length: 15 }).map((_, index) => (
          <CreatorsItem
            title={`Creator ${index + 1}`}
            views={876_431}
            thumbnail={AvatarImg}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
