import { MainLayout } from '../layout';
import { Typography } from '../ui/typography';
import { Container } from '../layout/container';
import { text } from '../../lib/text.ts';

type ErrorPageProps = {
  message?: string;
};

export const ErrorPage = ({
  message = text.pageDoesNotExist,
}: ErrorPageProps) => {
  return (
    <MainLayout displayBecomeCreator={false}>
      <div className="h-full flex items-center justify-center">
        <Container>
          <Typography className="mt-10" variant="h4">
            {message}
          </Typography>
        </Container>
      </div>
    </MainLayout>
  );
};
