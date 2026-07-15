import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-surface rounded-3xl p-8 shadow-premium border border-outline-variant/30 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              {title && (
                <h3 className="font-display text-headline-md font-bold text-on-surface">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto pr-1 hide-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
