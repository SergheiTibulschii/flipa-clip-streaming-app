import { Typography } from '../../ui/typography';
import { text as t } from '../../../lib/text.ts';
import { Button } from '../../ui/button';
import { useState } from 'react';
import clsx from 'clsx';

type ExpandableTextProps = {
  text: string;
  className?: string;
};

export const ExpandableText = ({ text, className }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cns = clsx({
    'max-lg:line-clamp-3 lg:truncate lg:max-w-[80%]': !isExpanded,
  });

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={className}>
      <Typography className={cns} variant="body1">
        {text}
      </Typography>
      <div className="mt-3">
        <Button onClick={toggleText} variant="text">
          {isExpanded ? t.less : t.more}
        </Button>
      </div>
    </div>
  );
};
