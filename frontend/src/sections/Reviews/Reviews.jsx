import React, { useEffect, useState } from 'react';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { getReviews } from '../../api/reviewApi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews()
      .then((res) => {
        // Just take the first 3 reviews for the home page section
        const recentReviews = (res.data.reviews || []).slice(0, 3);
        setReviews(recentReviews);
      })
      .catch((err) => console.error('Failed to load reviews:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || reviews.length === 0) {
    return null; // Hide section if loading or no reviews
  }

  return (
    <section className="py-16 bg-surface-container-low/20 border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-2">
            Diners love Zomato
          </h2>
          <p className="text-on-surface-variant text-body-md">
            Don't just take our word for it — read what they say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {reviews.map((rev) => (
            <ReviewCard
              key={rev._id}
              name={rev.user?.name || 'Anonymous User'}
              role="Foodie"
              rating={rev.rating}
              comment={rev.comment}
              avatar={null}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
