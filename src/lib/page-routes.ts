export const pageRoutes = {
  home: '/',
  video: {
    details: (id: string) => `/video/${id}`,
    play: (id: string) => `/video/${id}/play`,
  },
  creator: {
    details: (id: string) => `/creator/${id}`,
    become: '/become-creator',
  },
};
