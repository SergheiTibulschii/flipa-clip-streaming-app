export const pageRoutes = {
  home: '/',
  video: {
    details: (id: string) => `/video/${id}`,
  },
  creator: {
    details: (id: string) => `/creator/${id}`,
    become: '/become-creator',
  },
};
