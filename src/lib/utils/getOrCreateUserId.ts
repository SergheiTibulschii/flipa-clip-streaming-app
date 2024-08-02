import { getCookie, setCookie } from './browser.ts';

const cookieName = 'anonUserId';
export const getOrCreateUserId = async (): Promise<string> => {
  let anonUserId = getCookie(cookieName);

  if (!anonUserId) {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = (await response.json()) as { ip: string };
      anonUserId = ip;
      setCookie(cookieName, anonUserId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }

      return '';
    }
  }

  return anonUserId;
};
