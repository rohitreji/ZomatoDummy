import { useEffect, useState } from 'react';
import OfferCard from '../../components/OfferCard/OfferCard';
import { getOffers } from "../../api/offerApi";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers().then((response) => {
      setOffers(response.data.offers || []);
    });
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

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 select-none">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            percentage={offer.percentage}
            code={offer.code}
            desc={offer.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default Offers;
