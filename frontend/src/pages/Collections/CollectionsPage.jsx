import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { getCollections } from '../../services/api';

const CollectionsPage = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then(setCollections);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {collections.map((col) => (
          <CollectionCard
            key={col.id}
            title={col.title}
            count={col.count}
            image={col.image}
            onClick={() => navigate(`/search?col=${encodeURIComponent(col.title)}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
