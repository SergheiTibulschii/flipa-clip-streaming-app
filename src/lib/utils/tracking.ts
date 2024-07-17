export type trackEventType = 'flips_click';

export const sendMessage = (payload: {
  event: trackEventType;
  params: Record<string, string>;
}) => {
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.eventListener
  ) {
    window.webkit.messageHandlers.eventListener.postMessage({
      messageType: 'trackEvent',
      data: payload,
    });
  } else if (window.android) {
    window.android.postMessage({
      messageType: 'trackEvent',
      data: payload,
    });
  } else {
    console.log('Neither iOS nor Android WebView detected.');
  }
};
