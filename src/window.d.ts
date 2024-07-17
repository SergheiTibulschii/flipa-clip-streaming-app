declare global {
  type PostMessage = (payload: {
    messageType: string;
    data: {
      event: string;
      params: Record<string, string>;
    };
  }) => void;

  interface Window {
    webkit?: {
      messageHandlers?: {
        eventListener: {
          postMessage: PostMessage;
        };
      };
    };
    android?: {
      postMessage: PostMessage;
    };
  }
}

export {};
