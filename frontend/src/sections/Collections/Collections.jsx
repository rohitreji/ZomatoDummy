import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { getCollections } from '../../api/collectionApi';

const Collections = () => {
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

  const handleCollectionClick = (title) => {
    navigate(`/search?col=${encodeURIComponent(title)}`);
  };

  return (
    <section className="py-16 bg-surface-container-low/40 border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-8">
          Popular Collections
        </h2>
        {loading ? (
          <div className="text-center py-8 text-on-surface-variant text-body-sm">Loading collections...</div>
        ) : error ? (
          <div className="text-center py-8 text-error text-body-sm">{error}</div>
        ) : collections.length === 0 ? (
          <div className="text-center py-8 text-on-surface-variant text-body-sm">No collections available right now.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map((col) => (
              <CollectionCard
                key={col._id || col.id}
                title={col.title}
                count={col.restaurants?.length || 0}
                image={col.image}
                onClick={() => handleCollectionClick(col.title)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collections;
