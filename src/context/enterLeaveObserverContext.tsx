import type { MutableRefObject, PropsWithChildren } from 'react';
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

export type IntersectionObserverContextType = {
  getIntersectionObserver: () => IntersectionObserver;
};

export type VideoIntersectionObserverProviderType =
  PropsWithChildren<IntersectionObserverInit>;

export const IntersectionObserverContext =
  createContext<IntersectionObserverContextType>(
    {} as IntersectionObserverContextType
  );

const listenerCallbacks = new WeakMap();
const enteredElementsMap = new WeakMap();
let intersectionObserver: IntersectionObserver;

const EnterLeaveObserverProvider = memo(
  ({
    rootMargin = '0px',
    threshold = 0.15,
    children,
  }: VideoIntersectionObserverProviderType) => {
    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
      return () => {
        if (intersectionObserver) {
          intersectionObserver.disconnect();
        }
      };
    }, []);

    const handleIntersections = (entries: IntersectionObserverEntry[]) =>
      entries.forEach((entry) => {
        if (listenerCallbacks.has(entry.target)) {
          const entered = enteredElementsMap.get(entry.target);
          const { onEnter, onLeave, once } = listenerCallbacks.get(
            entry.target
          );

          if (entry.isIntersecting) {
            onEnter();

            if (!entered) {
              if (once) {
                once();
              }

              enteredElementsMap.set(entry.target, true);
            }
          } else if (entered) {
            if (onLeave) {
              onLeave();
            }
          }
        }
      });

    const getIntersectionObserver = useCallback(() => {
      if (!intersectionObserver) {
        intersectionObserver = new IntersectionObserver(handleIntersections, {
          rootMargin,
          threshold,
        });
      }

      return intersectionObserver;
    }, [rootMargin, threshold]);

    const contextValue = useMemo(
      () => ({
        getIntersectionObserver,
      }),
      [getIntersectionObserver]
    );

    return (
      <IntersectionObserverContext.Provider value={contextValue}>
        {children}
      </IntersectionObserverContext.Provider>
    );
  }
);

export const useEnterLeaveObserver = (
  ref: MutableRefObject<HTMLElement | null>,
  callbacks: {
    onEnter: VoidFunction;
    onLeave?: VoidFunction;
    once?: VoidFunction;
  }
) => {
  const { getIntersectionObserver } = useContext(IntersectionObserverContext);

  useEffect(() => {
    if (ref.current) {
      const observer = getIntersectionObserver();
      listenerCallbacks.set(ref.current, callbacks);
      observer.observe(ref.current);

      return () => {
        if (ref.current) {
          intersectionObserver.unobserve(ref.current);
          listenerCallbacks.delete(ref.current);
        }
      };
    }
  }, [getIntersectionObserver, ref.current]);
};

export { EnterLeaveObserverProvider };
