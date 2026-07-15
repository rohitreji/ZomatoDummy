import { MOCK_RESTAURANTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, MOCK_OFFERS } from '../constants';

const DELAY = 300; // Simulated network delay in ms

export const getRestaurants = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RESTAURANTS), DELAY);
  });
};

export const getRestaurant = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id);
      if (restaurant) {
        resolve(restaurant);
      } else {
        reject(new Error('Restaurant not found'));
      }
    }, DELAY);
  });
};

export const searchRestaurants = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(MOCK_RESTAURANTS);
        return;
      }
      const lower = query.toLowerCase();
      const filtered = MOCK_RESTAURANTS.filter(
        (r) =>
          r.name.toLowerCase().includes(lower) ||
          r.cuisine.some((c) => c.toLowerCase().includes(lower))
      );
      resolve(filtered);
    }, DELAY);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_CATEGORIES), DELAY);
  });
};

export const getCollections = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_COLLECTIONS), DELAY);
  });
};

export const getOffers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_OFFERS), DELAY);
  });
};

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email && credentials.password) {
        resolve({
          user: {
            name: credentials.email.split('@')[0],
            email: credentials.email,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd0TdE53bScD-RvKN8dTdVoxte2zCu0NnalF0TD6VIkaDe6beO_iMnHCCMnezUT6hCQ81CdQnAwUn4Ehs4qnW3N-5XVuanHn8hR_JKeHEeNrxTOsP_yWZHx_wi6Hk4rgFoPO7fNhTI1QAvmW4bGjUYoMo0lW0hrBKOC1hMf81e2LPzCKdpQpRskP0mASCpHhJOqDqeKL_lj-X3wVDmGiiMBSCKGl9DKVdFnBjozH2gu6Qj4x9MouXkNKzXOJhr5xFb6S6J47SoGq-5',
          },
          token: 'mock-jwt-token-zomato',
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, DELAY);
  });
};

export const signup = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password && userData.name) {
        resolve({
          user: {
            name: userData.name,
            email: userData.email,
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd0TdE53bScD-RvKN8dTdVoxte2zCu0NnalF0TD6VIkaDe6beO_iMnHCCMnezUT6hCQ81CdQnAwUn4Ehs4qnW3N-5XVuanHn8hR_JKeHEeNrxTOsP_yWZHx_wi6Hk4rgFoPO7fNhTI1QAvmW4bGjUYoMo0lW0hrBKOC1hMf81e2LPzCKdpQpRskP0mASCpHhJOqDqeKL_lj-X3wVDmGiiMBSCKGl9DKVdFnBjozH2gu6Qj4x9MouXkNKzXOJhr5xFb6S6J47SoGq-5',
          },
          token: 'mock-jwt-token-zomato',
        });
      } else {
        reject(new Error('Missing required fields'));
      }
    }, DELAY);
  });
};
