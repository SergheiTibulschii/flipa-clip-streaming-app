export const pageRoutes = {
  home: '/',
  video: {
    details: (id: number | string) => `/video/${id}`,
    play: (id: number | string, videoUrl: string) =>
      `/video/${id}/play?videoUrl=${videoUrl}`,
  },
  creator: {
    details: (id: number | string) => `/creator/${id}`,
    become: '/become-creator',
  },
};
