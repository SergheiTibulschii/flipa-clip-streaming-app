export const extractVimeoId = (url: string): string | null => {
  const regex = /vimeo\.com\/video\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
