import { CustomDialogProps, Dialog } from '../dialog.tsx';
import CreatorImg from '../../../assets/creator-bg.png';
import { Typography } from '../../typography';

const Background = () => (
  <div className="absolute inset-0 bg-dark">
    <img
      className="w-full h-full max-w-[900px] m-auto object-cover"
      src={CreatorImg}
    />
  </div>
);

type XxxDialogProps = CustomDialogProps;

export const XxxDialog = ({ isOpened, onDismiss }: XxxDialogProps) => {
  return (
    <Dialog
      isOpened={isOpened}
      onDismiss={onDismiss}
      overlayBackground={<Background />}
    >
      <Typography variant="h4">Become a Creator</Typography>
      <Typography variant="body1">
        Create your own animations thanks to incredible animation tool -
        FlipaClip Animation Studio
      </Typography>
    </Dialog>
  );
};
