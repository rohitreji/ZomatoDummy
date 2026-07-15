import React from 'react';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { MOCK_REVIEWS } from '../../constants';

const Reviews = () => {
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
          {MOCK_REVIEWS.map((rev) => (
            <ReviewCard
              key={rev.id}
              name={rev.name}
              role={rev.role}
              rating={rev.rating}
              comment={rev.comment}
              avatar={null} // Avatar fallback initial letter will trigger
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
