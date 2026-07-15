import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { getRestaurants } from '../../services/api';

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants()
      .then((data) => {
        // Mocking: Assume first 2 restaurants are favorited by default
        setFavorites(data.slice(0, 2));
      })
      .finally(() => setLoading(false));
  }, []);

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
      ) : favorites.length === 0 ? (
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
          {favorites.map((res) => (
            <RestaurantCard
              key={res.id}
              id={res.id}
              image={res.image}
              name={res.name}
              rating={res.rating}
              deliveryTime={res.deliveryTime}
              price={res.price}
              cuisine={res.cuisine}
              offer={res.offer}
              distance={res.distance}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
