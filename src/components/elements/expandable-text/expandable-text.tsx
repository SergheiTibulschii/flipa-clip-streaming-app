import { Typography } from '../../ui/typography';
import { text as t } from '../../../lib/text.ts';
import { Button } from '../../ui/button';
import { useState } from 'react';
import clsx from 'clsx';

type ExpandableTextProps = {
  text: string;
  maxLength?: number;
  className?: string;
};

export const ExpandableText = ({
  text,
  maxLength = 70,
  className,
}: ExpandableTextProps) => {
  const shouldExpand = text.length > maxLength;
  const [isExpanded, setIsExpanded] = useState(!shouldExpand);
  const cns = clsx({
    'max-lg:line-clamp-3 lg:truncate lg:max-w-[80%]': !isExpanded,
  });

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={className}>
      <Typography className={cns} variant="body1">
        {isExpanded ? text : text.substring(0, maxLength) + '...'}
      </Typography>
      {shouldExpand && (
        <div className="mt-3">
          <Button onClick={toggleText} variant="text">
            {isExpanded ? t.less : t.more}
          </Button>
        </div>
      )}
    </div>
  );
};
