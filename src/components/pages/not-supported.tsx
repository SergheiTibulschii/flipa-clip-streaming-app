import { Container } from '../layout/container';
import { Typography } from '../ui/typography';
import { text } from '../../lib/text.ts';
import { LogoIcon } from '../icons.ts';

export const NotSupported = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center py-4">
        <LogoIcon />
      </div>
      <div className="flex-1 flex items-center">
        <Container>
          <Typography className="text-center" variant="h4">
            {text.webIsNotSupported}
          </Typography>
        </Container>
      </div>
    </div>
  );
};
