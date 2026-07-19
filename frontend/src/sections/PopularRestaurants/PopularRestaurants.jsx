import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import Loader, { RestaurantSkeleton } from '../../components/Loader/Loader';
import { getRestaurants } from '../../api/restaurantApi';

const PopularRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getRestaurants();

        // Correctly access the restaurants array from response
        const restaurantsData = response?.data?.restaurants || [];

        // Store only the first 3 restaurants
        setRestaurants(restaurantsData.slice(0, 3));
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Handle error state
  if (error) {
    return (
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-1">
              Popular Restaurants
            </h2>
            <p className="text-on-surface-variant text-body-md">
              Top picks based on local ratings and popularity
            </p>
          </div>
          <Link
            to="/search"
            className="text-primary font-display text-label-lg font-extrabold hover:underline flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-error text-body-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-1">
            Popular Restaurants
          </h2>
          <p className="text-on-surface-variant text-body-md">
            Top picks based on local ratings and popularity
          </p>
        </div>
        <Link
          to="/search"
          className="text-primary font-display text-label-lg font-extrabold hover:underline flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <RestaurantSkeleton key={idx} />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-on-surface-variant text-body-lg">No restaurants available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              image={restaurant.image}
              name={restaurant.name}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              price={restaurant.price}
              cuisine={restaurant.cuisine}
              offer={restaurant.offer}
              distance={restaurant.distance}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularRestaurants;