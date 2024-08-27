import { Dialog } from '../../../../ui/dialog';
import CreatorBackground from '../../../../../assets/creator-bg.webp';
import { Typography } from '../../../../ui/typography';
import { text } from '../../../../../lib/text.ts';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/form';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Image } from '../../../../ui/image.tsx';
import { useGoBack } from '../../../../../lib/hooks/useGoBack.ts';
import { sendMessage } from '../../../../../lib/utils/tracking.ts';
import { generateId } from '../../../../../lib/utils/generateId.ts';

type EventPayloadType = {
  submit_form_success?: boolean;
  submit_form_error?: boolean;
  submit_form_cancel?: boolean;
  id: string;
};

export const BecomeCreatorDialog = () => {
  const goBack = useGoBack();
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formCancel, setFormCancel] = useState(false);
  const [formTimeout, setFormTimeout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const idRef = useRef<string | null>(null);

  useEffect(() => {
    const handleEventFromNativeApp = (
      event: Event & {
        detail?: string;
      }
    ) => {
      if (event.detail) {
        try {
          const payload = JSON.parse(event.detail) as EventPayloadType;
          if (payload.id === idRef.current) {
            if (payload.submit_form_success) {
              setFormSuccess(true);
              formRef.current?.reset();
            }
            if (payload.submit_form_error) {
              setFormError(true);
            }
            if (payload.submit_form_cancel) {
              setFormCancel(true);
            }

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setIsLoading(false);
          }
        } catch (parseError) {
          console.error('Error parsing event payload', parseError);
        }
      }
    };

    window.addEventListener('nativeEvent', handleEventFromNativeApp);

    return () => {
      window.removeEventListener('nativeEvent', handleEventFromNativeApp);
    };
  }, []);

  const handleTryAgain = () => {
    setFormSuccess(false);
    setFormError(false);
    setFormCancel(false);
    setFormTimeout(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formEntries: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      formEntries[key] = value;
    });

    idRef.current = generateId();
    sendMessage(
      {
        action: 'submit',
        payload: {
          ...(formEntries as Record<string, string>),
          id: idRef.current,
        },
      },
      'action'
    );
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      setFormTimeout(true);
      setIsLoading(false);
      idRef.current = null;
    }, 5000);
  };

  return (
    <Dialog
      overlayBackground={
        <Image src={CreatorBackground} className="image" alt="" />
      }
      onDismiss={goBack}
      isOpened
    >
      {formSuccess && (
        <div className="text-center">
          <Typography variant={'h4'}>{text.woohoo}</Typography>
          <Typography className="mt-3 max-w-[292px] m-auto" variant={'body1'}>
            {text.thanks}
          </Typography>
        </div>
      )}

      {formError && (
        <div className="text-center">
          <Typography variant={'h4'}>Uh-oh!</Typography>
          <Typography className="mt-3 max-w-[292px] m-auto" variant={'body1'}>
            Something went wrong while submitting your movie. Please try again
            later. We apologize for the inconvenience.
          </Typography>
          <Button
            type="button"
            className="mt-4 mx-auto"
            onClick={handleTryAgain}
          >
            Try again
          </Button>
        </div>
      )}

      {formCancel && (
        <div className="text-center">
          <Typography variant={'h4'}>Submission canceled</Typography>
          <Typography className="mt-3 max-w-[292px] m-auto" variant={'body1'}>
            Your movie submission has been canceled. Feel free to resubmit
            whenever you're ready. We'll be here!
          </Typography>
          <Button
            type="button"
            className="mt-4 mx-auto"
            onClick={handleTryAgain}
          >
            Try again
          </Button>
        </div>
      )}

      {formTimeout && (
        <div className="text-center">
          <Typography variant={'h4'}>Time's Up!</Typography>
          <Typography className="mt-3 max-w-[292px] m-auto" variant={'body1'}>
            It seems like the submission process took too long. Please try
            again, and make sure you have a stable connection. We’re eager to
            receive your movie!
          </Typography>
          <Button
            type="button"
            className="mt-4 mx-auto"
            onClick={handleTryAgain}
          >
            Try again
          </Button>
        </div>
      )}

      {!formSuccess && !formError && !formCancel && !formTimeout && (
        <form ref={formRef} onSubmit={handleSubmit}>
          <Typography variant={'h4'}>{text.becomeCreator}</Typography>
          <Typography variant={'body1'}>{text.includeLink}</Typography>
          <div className="mt-10 mb-8 flex flex-col gap-4">
            <Input
              required
              placeholder={text.name}
              name="name"
              disabled={isLoading}
            />
            <Input
              required
              placeholder={text.email}
              name="email"
              disabled={isLoading}
              type="email"
            />
            <Input
              required
              placeholder={text.link}
              name="link"
              disabled={isLoading}
              type="url"
            />
          </div>
          <Button
            type="submit"
            wide
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            {text.submit}
          </Button>
        </form>
      )}
    </Dialog>
  );
};
