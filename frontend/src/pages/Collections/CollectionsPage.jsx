import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { getCollections } from '../../api/collectionApi';

const CollectionsPage = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getCollections();
        setCollections(response?.data?.collections || []);
      } catch (err) {
        console.error('Failed to load collections:', err);
        setError('Failed to load collections. Please try again later.');
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
      <div className="mb-10 text-center">
        <h1 className="font-display text-headline-lg md:text-display-lg font-black text-on-surface mb-2">
          Curated Collections
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-xl mx-auto">
          Explore top lists of food, themed restaurant picks, and special local culinary guides.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-on-surface-variant text-body-sm">Loading collections...</div>
      ) : error ? (
        <div className="text-center py-12 text-error text-body-sm">{error}</div>
      ) : collections.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant text-body-sm">No collections available right now.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {collections.map((col) => (
            <CollectionCard
              key={col._id || col.id}
              title={col.title}
              count={col.restaurants?.length || 0}
              image={col.image}
              onClick={() => navigate(`/search?col=${encodeURIComponent(col.title)}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
