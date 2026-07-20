export const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80';

const CATEGORY_IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  biryani: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80',
  chinese: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=800&q=80',
  'south indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
  'north indian': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
  'ice cream': 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
  cakes: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80',
  momos: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
  rolls: 'https://images.unsplash.com/photo-1611143669185-5dddd8fca0d2?auto=format&fit=crop&w=800&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
  beverages: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80',
  coffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
};

const COLLECTION_IMAGES = {
  'trending': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80',
  'cafe': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
  'luxury': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
  'rooftop': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  'romantic': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  'family': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  'nightlife': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=80',
  'buffet': 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80',
  'pizza': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
  'budget': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80',
  'rated': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  'top': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
};

const COLLECTION_IMAGE_POOL = Object.values(COLLECTION_IMAGES);

const RESTAURANT_COVERS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=80',
];

const RESTAURANT_AVATARS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80',
];

const MENU_ITEM_IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  biryani: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
  salad: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  taco: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
  coffee: 'https://images.unsplash.com/photo-1495474472287-4c71bcdd2085?auto=format&fit=crop&w=800&q=80',
};

const AVATAR_POOL = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
];

const normalize = (value) => (typeof value === 'string' ? value.trim() : '');

const getSeededValue = (seed, values, fallback) => {
  if (!Array.isArray(values) || values.length === 0) return fallback;
  const text = normalize(seed || '');
  const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return values[hash % values.length] || fallback;
};

const getLookupImage = (value, lookup, fallback) => {
  const text = normalize(value || '').toLowerCase();
  if (!text) return fallback;
  const directMatch = lookup[text];
  if (directMatch) return directMatch;
  for (const [key, image] of Object.entries(lookup)) {
    if (text.includes(key)) return image;
  }
  return fallback;
};

export const resolveImage = (value, fallback = DEFAULT_FOOD_IMAGE) => {
  const raw = normalize(value);
  return raw ? raw : fallback;
};

export const getCategoryImage = (name, fallback = DEFAULT_FOOD_IMAGE) => {
  return getLookupImage(name, CATEGORY_IMAGES, fallback);
};

export const getCollectionImage = (title, fallback = DEFAULT_FOOD_IMAGE) => {
  const text = normalize(title || '').toLowerCase();
  
  if (text.includes('pizza')) return COLLECTION_IMAGES.pizza;
  if (text.includes('trending')) return COLLECTION_IMAGES.trending;
  if (text.includes('family')) return COLLECTION_IMAGES.family;
  if (text.includes('luxury')) return COLLECTION_IMAGES.luxury;
  if (text.includes('night') || text.includes('late')) return COLLECTION_IMAGES.nightlife;
  if (text.includes('budget') || text.includes('eat')) return COLLECTION_IMAGES.budget;
  if (text.includes('rate') || text.includes('top')) return COLLECTION_IMAGES.rated;
  if (text.includes('cafe') || text.includes('culture')) return COLLECTION_IMAGES.cafe;
  if (text.includes('roof')) return COLLECTION_IMAGES.rooftop;
  if (text.includes('romantic')) return COLLECTION_IMAGES.romantic;

  return getSeededValue(title || '', COLLECTION_IMAGE_POOL, fallback);
};

export const getRestaurantCover = (restaurant, fallback = DEFAULT_FOOD_IMAGE) => {
  const existing = normalize(restaurant?.image || restaurant?.imageUrl || '');
  if (existing && existing !== fallback && existing !== 'undefined') return existing;
  return getSeededValue(restaurant?.name || restaurant?.id || '', RESTAURANT_COVERS, fallback);
};

export const getRestaurantAvatar = (restaurant, fallback = DEFAULT_AVATAR) => {
  const existing = normalize(restaurant?.logo || restaurant?.avatar || restaurant?.profileImage || '');
  if (existing) return existing;
  return getSeededValue(restaurant?.name || restaurant?.id || '', RESTAURANT_AVATARS, fallback);
};

export const getMenuItemImage = (item, fallback = DEFAULT_FOOD_IMAGE) => {
  const existing = normalize(item?.image || item?.imageUrl || '');
  if (existing) return existing;
  const combined = `${item?.name || ''} ${item?.category || ''}`.toLowerCase();
  if (combined.includes('pizza')) return getLookupImage('pizza', CATEGORY_IMAGES, fallback);
  if (combined.includes('burger')) return getLookupImage('burger', CATEGORY_IMAGES, fallback);
  if (combined.includes('biryani')) return getLookupImage('biryani', CATEGORY_IMAGES, fallback);
  if (combined.includes('pasta')) return getLookupImage('pasta', MENU_ITEM_IMAGES, fallback);
  if (combined.includes('salad')) return getLookupImage('salad', MENU_ITEM_IMAGES, fallback);
  if (combined.includes('sushi')) return getLookupImage('sushi', MENU_ITEM_IMAGES, fallback);
  if (combined.includes('taco')) return getLookupImage('taco', MENU_ITEM_IMAGES, fallback);
  if (combined.includes('dessert')) return getLookupImage('dessert', MENU_ITEM_IMAGES, fallback);
  if (combined.includes('coffee')) return getLookupImage('coffee', MENU_ITEM_IMAGES, fallback);
  return getLookupImage(item?.category || item?.name || '', MENU_ITEM_IMAGES, fallback);
};

export const getAvatar = (value, fallback = DEFAULT_AVATAR, seed = 'user') => {
  const existing = normalize(value || '');
  if (existing) return existing;
  return getSeededValue(seed, AVATAR_POOL, fallback);
};

export const handleImageError = (event, fallback = DEFAULT_FOOD_IMAGE) => {
  const target = event?.currentTarget;
  if (!target) return;
  if (target.dataset.fallbackApplied === 'true') return;
  target.dataset.fallbackApplied = 'true';
  target.onerror = null;
  target.src = fallback;
};
