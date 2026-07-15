import React from 'react';
import { motion } from 'framer-motion';

const CollectionCard = ({ title, count, image, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 w-full"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6" />
      
      {/* Content */}
      <div className="absolute bottom-6 left-6 z-10">
        <p className="text-white font-display text-headline-sm font-extrabold mb-1">
          {title}
        </p>
        <p className="text-white/80 text-label-lg font-medium">
          {count} Places nearby
        </p>
      </div>
    </motion.div>
  );
};

export default CollectionCard;
