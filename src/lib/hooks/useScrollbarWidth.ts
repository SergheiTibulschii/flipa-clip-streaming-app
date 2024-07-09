import { useEffect, useRef } from 'react';

export const useScrollbarWidth = () => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);

  return useEffect(() => {
    outerRef.current = document.createElement('div');
    outerRef.current.style.visibility = 'hidden';
    outerRef.current.style.overflow = 'scroll';
    document.body.appendChild(outerRef.current);
    innerRef.current = document.createElement('div');
    outerRef.current.appendChild(innerRef.current);

    const handleResize = () => {
      if (outerRef.current && innerRef.current) {
        document.documentElement.style.setProperty(
          '--scrollbar-width',
          `${outerRef.current.offsetWidth - innerRef.current.offsetWidth}px`
        );
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
