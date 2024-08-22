import {
  Children,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import styles from './styles/index.module.scss';
import { IconButton } from '../../ui/button/icon-button.tsx';
import { CaretDownIcon } from '../../icons.ts';
import { Toggler } from '../toggler.tsx';
import { debounce } from '../../../lib/utils/debounce.ts';

type SlidingPanelProps = PropsWithChildren<{
  isLoading?: boolean;
  skeletonItem: (props: unknown) => JSX.Element;
  title: string;
}>;

const toggleElementClass = 'toggler';
export const SlidingPanel = ({
  title,
  children,
  skeletonItem: Skeleton,
  isLoading = false,
}: SlidingPanelProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isControlVisible, setIsControlVisible] = useState<boolean | undefined>(
    undefined
  );
  const gridCln = clsx(styles.panel__grid, {
    'flex-wrap': isOpened,
    'overflow-hidden': !isOpened,
  });
  const gridRef = useRef<HTMLDivElement | null>(null);
  const mainGridCns = clsx(styles.panel__grid, {
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
    let lastWidth = window.innerWidth;

    const setInitialHeight = debounce(() => {
      if (window.innerWidth !== lastWidth) {
        const gridElement = gridRef.current as HTMLDivElement;
        const firstChildElement = gridRef.current?.firstChild as HTMLElement;
        if (gridElement && firstChildElement) {
          gridElement.style.height = `${firstChildElement.clientHeight}px`;
          setIsControlVisible(
            gridElement.scrollHeight > gridElement.clientHeight
          );
        }

        lastWidth = window.innerWidth;
      }
    }, 100);

    const handleInvisibleItems = debounce(() => {
      if (lastWidth !== window.innerWidth) {
        lastWidth = window.innerWidth;
        setToggleClassOnInvisibleItems(isLoading);
      }
    }, 100);

    window.addEventListener('resize', setInitialHeight);
    window.addEventListener('resize', handleInvisibleItems);

    if (!isLoading) setInitialHeight();

    setToggleClassOnInvisibleItems(isLoading);
    return () => {
      window.removeEventListener('resize', setInitialHeight);
      window.removeEventListener('resize', handleInvisibleItems);
    };
  }, [isLoading]);

  return (
    <div className={styles.panel}>
      <div className="flex items-center justify-between mb-6">
        <div className="font-bold leading-1.5">{title}</div>
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
              <Skeleton key={index} />
            ))}
          </div>
        )}
        <div ref={gridRef} className={mainGridCns}>
          {Children.map(children, (child, index) => (
            <Toggler
              key={index}
              className={`transition-opacity ease-in-out duration-700`}
            >
              {child}
            </Toggler>
          ))}
        </div>
      </div>
    </div>
  );
};
