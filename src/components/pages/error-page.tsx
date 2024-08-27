import { MainLayout } from '../layout';
import { Typography } from '../ui/typography';
import { Container } from '../layout/container';
import { text } from '../../lib/text.ts';

export const ErrorPage = () => {
  return (
    <MainLayout displayBecomeCreator={false}>
      <div className="h-full flex items-center justify-center">
        <Container>
          <Typography className="mt-10" variant="h4">
            {text.pageDoesNotExist}
          </Typography>
        </Container>
      </div>
    </MainLayout>
  );
};
