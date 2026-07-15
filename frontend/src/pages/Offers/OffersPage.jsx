import { useEffect, useState } from 'react';
import OfferCard from '../../components/OfferCard/OfferCard';
import { getOffers } from '../../services/api';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers().then(setOffers);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
      <div className="mb-12 text-center">
        <h1 className="font-display text-headline-lg md:text-display-lg font-black text-on-surface mb-2">
          Exclusive Promos & Discounts
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-xl mx-auto">
          Copy promo codes during checkout to apply food discounts and grab free delivery deals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            percentage={offer.percentage}
            code={offer.code}
            desc={offer.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
