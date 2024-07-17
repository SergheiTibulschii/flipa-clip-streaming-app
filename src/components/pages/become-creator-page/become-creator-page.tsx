import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { BecomeCreatorDialog } from './components/become-creator-dialog/become-creator-dialog.tsx';

export const BecomeCreatorPage = () => {
  return (
    <MainLayout displayBecomeCreator={false} displayHeader={false}>
      <Container>
        <BecomeCreatorDialog />
      </Container>
    </MainLayout>
  );
};
