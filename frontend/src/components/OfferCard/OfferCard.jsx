import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const OfferCard = ({ percentage, code, desc }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex-shrink-0 w-80 bg-gradient-to-br from-primary via-primary-container to-secondary p-6 rounded-3xl text-white shadow-lg overflow-hidden group">
      {/* Background visual element */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-md group-hover:scale-120 transition-transform duration-500" />
      
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-label-sm font-bold tracking-wider uppercase mb-3">
            Promo Offer
          </span>
          <h3 className="font-display text-display-lg font-black leading-none mb-1">
            {percentage}
          </h3>
          <p className="text-white/90 text-body-sm font-medium">{desc}</p>
        </div>

        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
          <code className="font-mono text-label-lg font-bold select-all tracking-wider px-2">
            {code}
          </code>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white text-primary px-3 py-1.5 rounded-lg text-label-md font-bold hover:bg-surface-container-lowest transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
