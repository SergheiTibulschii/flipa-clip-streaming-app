import { useEnterLeaveObserver } from '../../context/enterLeaveObserverContext.tsx';
import { PropsWithChildren, useRef } from 'react';

type TogglerProps = PropsWithChildren<{
  className?: string;
}>;

export const Toggler = ({ className, children }: TogglerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEnterLeaveObserver(ref, {
    onEnter: () => {
      if (ref.current) {
        ref.current.style.opacity = '1';
      }
    },
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
