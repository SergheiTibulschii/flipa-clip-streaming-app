export const isValidVimeoVideo = (url: string): boolean => {
  try {
    const { hostname } = new URL(url);
    return hostname === 'vimeo.com';
  } catch (e) {
    return false;
  }
};
