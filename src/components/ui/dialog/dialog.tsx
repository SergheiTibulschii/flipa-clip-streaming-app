import { PropsWithChildren, ReactElement } from 'react';
import clsx from 'clsx';
import { DialogProvider } from './dialog-context.tsx';
import './styles/dialog.scss';
import { IconButton } from '../button/icon-button.tsx';
import { CloseIcon } from '../../icons.ts';

export type CustomDialogProps = Pick<DialogProps, 'isOpened' | 'onDismiss'>;

export type DialogProps = PropsWithChildren<{
  isOpened?: boolean;
  onDismiss?: () => void;
  overlayBackground?: ReactElement;
  overlayClassName?: string;
  contentClassName?: string;
}>;

export const Dialog = ({
  onDismiss,
  isOpened,
  overlayClassName,
  contentClassName,
  overlayBackground,
  children,
}: DialogProps) => {
  const modalOverlayClasses = clsx('dialog-overlay', overlayClassName);
  const modalContentClasses = clsx('dialog-content', contentClassName);

  return isOpened ? (
    <DialogProvider onDissmiss={onDismiss} isOpened={isOpened}>
      <div className={modalOverlayClasses} onClick={onDismiss}>
        <div className="h-full flex overflow-y-auto md:p-5">
          {overlayBackground && (
            <div className="dialog-background">{overlayBackground}</div>
          )}
          <div
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            className={modalContentClasses}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              className="absolute top-4 right-4 md:top-[10px] md:right-[10px]"
              variant="secondary"
              onClick={onDismiss}
            >
              <CloseIcon />
            </IconButton>
            <div className="dialog-body">{children}</div>
          </div>
        </div>
      </div>
    </DialogProvider>
  ) : null;
};
