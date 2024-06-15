export const pageRoutes = {
  home: '/',
  video: {
    details: (id: number | string) => `/video/${id}`,
  },
  creator: {
    details: (id: number | string) => `/creator/${id}`,
    become: '/become-creator',
  },
};
