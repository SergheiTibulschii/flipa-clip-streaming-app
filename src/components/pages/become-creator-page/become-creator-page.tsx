import { MainLayout } from '../../layout';
import { Container } from '../../layout/container';
import { BecomeCreatorDialog } from './components/become-creator-dialog/become-creator-dialog.tsx';
import { useEffect, useRef } from 'react';

export const BecomeCreatorPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = '1';
      }
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className="w-full opacity-0 transition-opacity duration-500">
      <MainLayout displayBecomeCreator={false} displayHeader={false}>
        <Container>
          <BecomeCreatorDialog />
        </Container>
      </MainLayout>
    </div>
  );
};
