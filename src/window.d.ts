declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        eventListener: {
          postMessage: (payload: {
            messageType: string;
            data:
              | {
                  event: string;
                  params: Record<string, string>;
                }
              | Record<string, string | Record<string, string>>;
          }) => void;
        };
      };
    };
    android?: {
      postMessage: (payload: string) => void;
    };
  }
}

export {};
