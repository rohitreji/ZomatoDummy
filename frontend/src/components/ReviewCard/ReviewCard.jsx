import React from 'react';
import { Star } from 'lucide-react';
import { getAvatar, handleImageError, DEFAULT_AVATAR } from '../../utils/imageAssets';

const ReviewCard = ({ name, role, rating, comment, avatar }) => {
  const resolvedAvatar = getAvatar(avatar, DEFAULT_AVATAR, name);

  return (
    <div className="bg-white p-8 rounded-3xl border border-outline-variant/35 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Star Rating */}
        <div className="flex gap-1 text-yellow-500 mb-5">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" className="text-yellow-500" />
          ))}
        </div>

        {/* Comment */}
        <p className="italic text-on-surface-variant mb-6 text-body-md leading-relaxed">
          "{comment}"
        </p>
      </div>

      {/* Profile info */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-outline-variant/15">
        <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden flex-shrink-0 border border-outline-variant/20">
          <img
            src={resolvedAvatar}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(event) => handleImageError(event, DEFAULT_AVATAR)}
          />
        </div>
        <div>
          <p className="font-bold text-on-surface text-body-md leading-tight">{name}</p>
          <p className="text-label-sm text-on-surface-variant/75">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
