export const pageRoutes = {
  home: '/',
  video: {
    details: (id: number | string) => `/video/${id}`,
    play: (id: number | string) => `/video/${id}/play`,
  },
  creator: {
    details: (id: number | string) => `/creator/${id}`,
    become: '/become-creator',
  },
};
