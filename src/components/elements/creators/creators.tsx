import styles from './styles/index.module.scss';
import { text } from '../../../lib/text.ts';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CaretDownIcon } from '../../icons.ts';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { CreatorsItem } from './components/creators-item/creators-item.tsx';
import AvatarImg from '../../../assets/avatar.png';
import { CreatorsItemSkeleton } from './components/creators-item/creators-item-skeleton.tsx';
import { Toggler } from '../toggler.tsx';

const toggleElementClass = 'toggler';
export const Creators = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isControlVisible, setIsControlVisible] = useState<boolean | undefined>(
    undefined
  );
  const gridCln = clsx(styles.creators__grid, {
    'flex-wrap': isOpened,
    'overflow-hidden': !isOpened,
  });
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mainGridCns = clsx(styles.creators__grid, {
    'absolute w-full invisible top-0': isLoading,
  });

  const setGridHeight = () => {
    const gridElement = gridRef.current as HTMLDivElement;
    const firstChildElement = gridRef.current?.firstChild as HTMLElement;

    if (gridElement && firstChildElement) {
      gridElement.style.height = isOpened
        ? `${firstChildElement.clientHeight}px`
        : `${gridElement.scrollHeight}px`;
    }
  };

  const togglePanel = () => {
    const gridElement = gridRef.current as HTMLDivElement;

    if (gridElement && isOpened) {
      const togglerItems = Array.from(
        gridElement.querySelectorAll(`.${toggleElementClass}`)
      );

      togglerItems.forEach((item) => {
        (item as HTMLElement).style.opacity = '0';
      });
    }

    if (isOpened) {
      setTimeout(() => {
        setGridHeight();

        setIsOpened(false);
      }, 125);
    } else {
      setGridHeight();
      setIsOpened(true);
    }
  };

  const setInitialHeight = () => {
    const gridElement = gridRef.current as HTMLDivElement;
    const firstChildElement = gridRef.current?.firstChild as HTMLElement;

    if (gridElement && firstChildElement) {
      gridElement.style.height = `${firstChildElement.clientHeight}px`;
      setIsControlVisible(gridElement.scrollHeight > gridElement.clientHeight);
    }
  };

  const setToggleClassOnInvisibleItems = (isLoading: boolean) => {
    const gridElement = gridRef.current as HTMLDivElement;

    if (!isLoading && gridElement) {
      const gridItems = Array.from(gridElement.children);
      const gridRect = gridElement.getBoundingClientRect();

      gridItems.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.bottom > gridRect.bottom || itemRect.top < gridRect.top) {
          item.classList.add(toggleElementClass);
        } else {
          item.classList.remove(toggleElementClass);
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', setInitialHeight);
    setInitialHeight();

    return () => {
      window.removeEventListener('resize', setInitialHeight);
    };
  }, []);

  useEffect(() => {
    const handler = () => setToggleClassOnInvisibleItems(isLoading);

    window.addEventListener('resize', handler);
    setToggleClassOnInvisibleItems(isLoading);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isControlVisible !== undefined) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isControlVisible]);

  return (
    <div className={styles.creators}>
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold leading-1.5">{text.creators}</div>
        <IconButton
          className={`${isControlVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
          onClick={isControlVisible ? togglePanel : undefined}
          variant="secondary"
        >
          <CaretDownIcon
            className={`transition-transform ${isOpened ? 'rotate-180' : 'rotate-0'}`}
          />
        </IconButton>
      </div>
      <div className="relative">
        {isLoading && (
          <div className={gridCln}>
            {Array.from({ length: 3 }).map((_, index) => (
              <CreatorsItemSkeleton key={index} />
            ))}
          </div>
        )}
        <div ref={gridRef} className={mainGridCns}>
          {Array.from({ length: 13 }).map((_, index) => (
            <Toggler
              key={index}
              className={`transition-opacity ease-in-out duration-700`}
            >
              <CreatorsItem
                title={`Creator ${index + 1}`}
                views={876_431}
                thumbnail={AvatarImg}
              />
            </Toggler>
          ))}
        </div>
      </div>
    </div>
  );
};
