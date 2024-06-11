import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

type DialogContextValueType = {
  isOpened?: boolean;
  onDissmiss: () => void;
};

const DialogContext = createContext<DialogContextValueType>(
  {} as DialogContextValueType
);

type DialogProviderProps = PropsWithChildren<DialogContextValueType>;

export const DialogProvider = ({
  onDissmiss,
  isOpened,
  children,
}: DialogProviderProps) => {
  const contextValue = useMemo(
    () => ({
      isOpened,
      onDissmiss,
    }),
    [onDissmiss, isOpened]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
