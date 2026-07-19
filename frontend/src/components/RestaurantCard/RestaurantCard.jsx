import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const RestaurantCard = ({
  id,
  image,
  name,
  rating,
  deliveryTime,
  price,
  cuisine = [],
  offer,
  distance,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const cuisineText = Array.isArray(cuisine)
    ? cuisine.filter(Boolean).join(' • ')
    : cuisine
      ? String(cuisine)
      : 'Restaurant';

  return (
    <motion.article
      onClick={() => (id ? navigate(`/restaurant/${id}`) : null)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-card hover:shadow-premium group cursor-pointer transition-all duration-300 w-full"
    >
      {/* Image Wrap */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden bg-surface-container">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Heart / Like Button */}
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-primary shadow-md hover:bg-white active:scale-95 transition-colors"
          >
            <Heart
              size={18}
              fill={isLiked ? '#b7122a' : 'transparent'}
              className={isLiked ? 'text-primary' : 'text-on-surface-variant'}
            />
          </motion.button>
        </div>

        {/* Offer Tag */}
        {offer && (
          <div className="absolute bottom-4 left-4 bg-primary text-white font-bold text-label-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
            <Tag size={12} />
            <span>{offer}</span>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="font-display text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-lg flex-shrink-0 font-bold text-label-sm">
              <span>{rating}</span>
              <Star size={12} fill="currentColor" />
            </div>
          </div>

          <p className="text-on-surface-variant text-body-sm line-clamp-1 mb-4">
            {cuisineText}
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15 text-on-surface-variant text-label-lg font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-primary" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{distance}</span>
            <span>•</span>
            <span className="text-primary">{price}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default RestaurantCard;
