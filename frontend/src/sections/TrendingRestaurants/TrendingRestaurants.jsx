import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { RestaurantSkeleton } from '../../components/Loader/Loader';
import { getRestaurants } from '../../services/api';

const TrendingRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurants()
      .then((data) => {
        // Take another 3 elements for trending view
        setRestaurants(data.slice(3, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-1">
            Trending Restaurants
          </h2>
          <p className="text-on-surface-variant text-body-md">
            The city's hottest spots, right to your dining room
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {restaurants.map((res) => (
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
    </section>
  );
};

export default TrendingRestaurants;
