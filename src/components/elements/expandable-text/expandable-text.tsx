import { text as t } from '../../../lib/text.ts';
import { Button } from '../../ui/button';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
  className?: string;
};

export const ExpandableText = ({ text, className }: ExpandableTextProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const cns = clsx({
    'line-clamp-2': !isExpanded,
  });
  const btnContainerCns = clsx('mt-3', {
    'visible pointer-events-auto': isOverflowing,
    'invisible pointer-events-none': !isOverflowing,
  });

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const onResize = () => {
      setTimeout(() => {
        if (ref.current) {
          const containerHeight = ref.current?.scrollHeight || 0;
          const heightLimit =
            parseInt(window.getComputedStyle(ref.current).lineHeight) * 2;
          setIsOverflowing(containerHeight > heightLimit);
        }
      }, 0);
    };
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={className}>
      <div className={cns} ref={ref}>
        {/*<Typography className={cns} variant="body1">*/}
        {/*  /!*{isExpanded ? text : text.substring(0, maxLength) + '...'}*!/*/}
        {/*  {text}*/}
        {/*</Typography>*/}
        {text}
      </div>
      <div className={btnContainerCns}>
        <Button onClick={toggleText} variant="text">
          {isExpanded ? t.less : t.more}
        </Button>
      </div>
    </div>
  );
};
