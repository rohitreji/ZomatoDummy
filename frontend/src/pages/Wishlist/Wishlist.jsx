import { useEffect, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { getWishlistByUser, removeFromWishlist } from '../../api/wishlistApi';
import { useAuth } from '../../hooks/useAuth';

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    getWishlistByUser(user._id)
      .then((res) => {
        setWishlistItems(res.data.wishlists || []);
      })
      .catch((err) => {
        console.error('Failed to load wishlist:', err);
        setError('Failed to load your wishlist. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (wishlistId) => {
    setRemovingId(wishlistId);
    try {
      await removeFromWishlist(wishlistId);
      setWishlistItems((prev) => prev.filter((item) => item._id !== wishlistId));
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
      <div className="mb-8">
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          Your Wishlist
        </h1>
        <p className="text-on-surface-variant text-body-sm mt-1">
          Your saved restaurants and food joints
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading favorites...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/20 flex flex-col items-center gap-2">
          <Heart size={48} className="text-primary animate-pulse" />
          <h3 className="font-display text-headline-sm font-extrabold text-on-surface mt-2">
            Your Wishlist is Empty
          </h3>
          <p className="text-on-surface-variant text-body-sm max-w-sm">
            Save your favorite restaurants by clicking the heart button on restaurant cards.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlistItems.map((item) => {
            const res = item.restaurant || {};
            return (
              <div key={item._id} className="relative group">
                <RestaurantCard
                  id={res._id}
                  image={res.image}
                  name={res.name}
                  rating={res.rating}
                  deliveryTime={res.deliveryTime || '30–40 min'}
                  price={res.price || ''}
                  cuisine={res.cuisine || []}
                  offer={res.offer || null}
                  distance={res.distance || ''}
                />
                <button
                  onClick={() => handleRemove(item._id)}
                  disabled={removingId === item._id}
                  className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
