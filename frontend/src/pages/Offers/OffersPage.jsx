import { useEffect, useState } from 'react';
import OfferCard from '../../components/OfferCard/OfferCard';
import { getCoupons } from '../../api/couponApi';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await getCoupons();
        const now = new Date();
        const active = (res?.data?.coupons || []).filter((coupon) => {
          const expiry = coupon?.expiryDate ? new Date(coupon.expiryDate) : null;
          return coupon?.isActive && expiry && expiry > now;
        });
        setOffers(active);
      } catch (err) {
        console.error('Failed to load coupons:', err);
        setError('Failed to load offers. Please try again later.');
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const formatPercentage = (coupon) => {
    if (coupon.discountType === 'Percentage') return `${coupon.discountValue}% OFF`;
    return `₹${coupon.discountValue} OFF`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
      <div className="mb-12 text-center">
        <h1 className="font-display text-headline-lg md:text-display-lg font-black text-on-surface mb-2">
          Exclusive Promos &amp; Discounts
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-xl mx-auto">
          Copy promo codes during checkout to apply food discounts and grab free delivery deals.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-on-surface-variant text-body-sm">Loading offers...</div>
      ) : error ? (
        <div className="text-center py-12 text-error text-body-sm">{error}</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-20 text-on-surface-variant text-body-sm">No active offers available right now.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {offers.map((coupon) => (
            <OfferCard
              key={coupon._id || coupon.id}
              percentage={formatPercentage(coupon)}
              code={coupon.code}
              desc={coupon.description || `Min. order ₹${coupon.minimumOrderAmount}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersPage;
