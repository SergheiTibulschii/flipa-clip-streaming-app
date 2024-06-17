export const routes = {
  randomImage: (
    category:
      | 'nature'
      | 'city'
      | 'technology'
      | 'food'
      | 'still_life'
      | 'abstract'
      | 'wildlife'
  ) => `randomimage?category=${category}`,
};
