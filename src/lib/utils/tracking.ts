export type trackEventType = 'flips_click' | 'flips_view' | 'flips_view_home';
export type messageType = 'trackEvent' | 'action' | 'deeplink';

export const sendMessage = (
  payload:
    | {
        event: trackEventType;
        params: Record<string, string>;
      }
    | { url: string }
    | { action: 'close' | 'submit'; payload?: Record<string, string> },
  messageType: messageType = 'trackEvent'
) => {
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.eventListener
  ) {
    window.webkit.messageHandlers.eventListener.postMessage({
      messageType: messageType,
      data: payload,
    });
  } else if (window.android) {
    window.android.postMessage(
      JSON.stringify({
        messageType: messageType,
        data: payload,
      })
    );
  } else {
    console.log('Neither iOS nor Android WebView detected.');
  }
};
