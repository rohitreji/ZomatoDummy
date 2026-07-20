import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  getWishlistByUser, 
  addToWishlist as apiAdd, 
  removeFromWishlist as apiRemove 
} from '../api/wishlistApi';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user?._id) {
      setWishlist([]);
      return;
    }
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await getWishlistByUser(user._id);
        setWishlist(res.data.wishlists || []);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user, isAuthenticated]);

  const isWishlisted = (restaurantId) => {
    return wishlist.some(item => {
      const rId = item.restaurant?._id || item.restaurant;
      return rId === restaurantId;
    });
  };

  const toggleWishlist = async (restaurantId) => {
    if (!isAuthenticated || !user?._id) return;
    const existing = wishlist.find(item => {
      const rId = item.restaurant?._id || item.restaurant;
      return rId === restaurantId;
    });
    if (existing) {
      try {
        await apiRemove(existing._id);
        setWishlist(prev => prev.filter(item => item._id !== existing._id));
      } catch (err) {
        console.error('Error removing from wishlist:', err);
      }
    } else {
      try {
        const res = await apiAdd({ user: user._id, restaurant: restaurantId });
        if (res.data?.wishlist) {
          setWishlist(prev => [res.data.wishlist, ...prev]);
        }
      } catch (err) {
        console.error('Error adding to wishlist:', err);
      }
    }
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, isWishlisted, toggleWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
