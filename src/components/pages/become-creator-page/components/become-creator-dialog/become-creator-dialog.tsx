import { Dialog } from '../../../../ui/dialog';
import CreatorBackground from '../../../../../assets/creator-bg.webp';
import { Typography } from '../../../../ui/typography';
import { text } from '../../../../../lib/text.ts';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/form';
import { FormEvent, useState } from 'react';
import { Image } from '../../../../ui/image.tsx';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';

export const BecomeCreatorDialog = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const goBack = useGoBack();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      formEntries[key] = value;
    });

    console.log({ formEntries });
    setShowThankYou(true);
  };

  return (
    <Dialog
      overlayBackground={
        <Image src={CreatorBackground} className="image" alt="" />
      }
      onDismiss={goBack}
      isOpened
    >
      {showThankYou ? (
        <div className="text-center">
          <Typography variant={'h4'}>{text.woohoo}</Typography>
          <Typography className="mt-3 max-w-[292px] m-auto" variant={'body1'}>
            {text.thanks}
          </Typography>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Typography variant={'h4'}>{text.becomeCreator}</Typography>
          <Typography variant={'body1'}>{text.includeLink}</Typography>
          <div className="mt-10 mb-8 flex flex-col gap-4">
            <Input placeholder={text.name} name="name" />
            <Input placeholder={text.email} name="email" />
            <Input placeholder={text.link} name="link" />
          </div>
          <Button type="submit" wide>
            {text.submit}
          </Button>
        </form>
      )}
    </Dialog>
  );
};
