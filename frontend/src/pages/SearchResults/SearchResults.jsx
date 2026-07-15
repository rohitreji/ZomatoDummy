import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Star, Award, Flame } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { RestaurantSkeleton } from '../../components/Loader/Loader';
import { searchRestaurants } from '../../services/api';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('c') || '';
  const collectionTitle = searchParams.get('col') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter active states
  const [sortBy, setSortBy] = useState('rating'); // rating, deliveryTime
  const [minRating, setMinRating] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Find matched records from api service
    const fetchQuery = query || categoryId || collectionTitle;
    searchRestaurants(fetchQuery)
      .then((data) => {
        let results = [...data];

        // Apply local filter overrides
        if (minRating) {
          results = results.filter((r) => r.rating >= 4.5);
        }
        if (fastDelivery) {
          results = results.filter((r) => parseInt(r.deliveryTime) <= 25);
        }
        if (hasOffers) {
          results = results.filter((r) => !!r.offer);
        }

        // Apply sort
        if (sortBy === 'rating') {
          results.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'deliveryTime') {
          results.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
        }

        setRestaurants(results);
      })
      .finally(() => setLoading(false));
  }, [query, categoryId, collectionTitle, sortBy, minRating, fastDelivery, hasOffers]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 mt-4">
      {/* Search description heading */}
      <div className="mb-6">
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          {query ? `Search results for "${query}"` : categoryId ? `Cuisine: ${categoryId}` : collectionTitle ? `Collection: ${collectionTitle}` : 'Explore Restaurants'}
        </h1>
        <p className="text-on-surface-variant text-body-sm mt-1">
          {restaurants.length} places available nearby
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-2.5 overflow-x-auto hide-scrollbar py-3 border-b border-outline-variant/15 mb-8">
        {/* Sort Filter selector */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant bg-white shadow-sm hover:bg-surface-container-high transition-colors outline-none font-bold text-label-md cursor-pointer"
        >
          <option value="rating">Sort: High Rating</option>
          <option value="deliveryTime">Sort: Fast Delivery</option>
        </select>

        {/* Rating chip toggle */}
        <button
          onClick={() => setMinRating(!minRating)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border shadow-sm transition-all font-bold text-label-md select-none
            ${minRating ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant hover:bg-surface-container-high'}
          `}
        >
          <Star size={14} fill={minRating ? 'currentColor' : 'transparent'} />
          <span>Rating 4.5+</span>
        </button>

        {/* Fast Delivery toggle */}
        <button
          onClick={() => setFastDelivery(!fastDelivery)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border shadow-sm transition-all font-bold text-label-md select-none
            ${fastDelivery ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant hover:bg-surface-container-high'}
          `}
        >
          <Award size={14} />
          <span>Fast Delivery (≤25 min)</span>
        </button>

        {/* Has Offers toggle */}
        <button
          onClick={() => setHasOffers(!hasOffers)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full border shadow-sm transition-all font-bold text-label-md select-none
            ${hasOffers ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface border-outline-variant hover:bg-surface-container-high'}
          `}
        >
          <Flame size={14} />
          <span>Offers</span>
        </button>
      </div>

      {/* Grid results container */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <RestaurantSkeleton key={idx} />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/20 flex flex-col items-center gap-2">
          <SlidersHorizontal size={48} className="text-on-surface-variant/40 animate-pulse" />
          <h3 className="font-display text-headline-sm font-extrabold text-on-surface mt-2">
            No Restaurants Match Your Filters
          </h3>
          <p className="text-on-surface-variant text-body-sm max-w-sm">
            Try adjusting your search query or reset toggles to find available choices near you.
          </p>
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
    </div>
  );
};

export default SearchResults;
