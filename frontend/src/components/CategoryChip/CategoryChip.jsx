import React from 'react';
import { motion } from 'framer-motion';
import { getCategoryImage, handleImageError, DEFAULT_FOOD_IMAGE } from '../../utils/imageAssets';

const CategoryChip = ({ name, image, onClick }) => {
  const resolvedImage = getCategoryImage(name, image || DEFAULT_FOOD_IMAGE);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
    >
      <div className="w-20 h-20 rounded-full bg-surface-container-low p-1 overflow-hidden shadow-sm hover:shadow-md border border-outline-variant/15 transition-all duration-300">
        <img
          src={resolvedImage}
          alt={name}
          className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(event) => handleImageError(event, DEFAULT_FOOD_IMAGE)}
        />
      </div>
      <span className="font-display text-label-lg text-on-surface font-semibold group-hover:text-primary transition-colors">
        {name}
      </span>
    </motion.div>
  );
};

export default CategoryChip;
