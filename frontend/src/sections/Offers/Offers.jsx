import { useEffect, useState } from 'react';
import OfferCard from '../../components/OfferCard/OfferCard';
import { getOffers } from '../../api/offerApi';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getOffers();
        setOffers(response?.data?.offers || []);
      } catch (err) {
        console.error('Failed to load offers:', err);
        setError('Failed to load offers. Please try again later.');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="mb-8">
        <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-1">
          Exclusive Offers
        </h2>
        <p className="text-on-surface-variant text-body-md">
          Save big on your next meal with special promo codes
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-on-surface-variant text-body-sm">Loading offers...</div>
      ) : error ? (
        <div className="text-center py-8 text-error text-body-sm">{error}</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant text-body-sm">No offers available right now.</div>
      ) : (
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 select-none">
          {offers.map((offer) => (
            <OfferCard
              key={offer._id || offer.id}
              percentage={offer.discount ? `${offer.discount}% OFF` : offer.percentage}
              code={offer.code}
              desc={offer.description || offer.desc}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Offers;
