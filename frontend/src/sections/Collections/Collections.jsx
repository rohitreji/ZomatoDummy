import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { getCollections } from "../../api/collectionApi";
const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getCollections().then((response) => {
      setCollections(response.data.collections || []);
    });
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              title={col.title}
              count={col.count}
              image={col.image}
              onClick={() => handleCollectionClick(col.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
