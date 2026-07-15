import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 shadow-sm"
      >
        <Compass size={36} className="stroke-[1.5]" />
      </motion.div>

      <h1 className="font-display text-4xl font-black text-on-surface">
        404 — Page Not Found
      </h1>
      <p className="text-on-surface-variant text-body-sm mb-4 leading-relaxed">
        The page you are looking for does not exist or has been moved. Try returning home to discover delicious local meals.
      </p>

      <Button
        variant="primary"
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center gap-1.5"
        icon={<Home size={16} />}
      >
        Go back Home
      </Button>
    </div>
  );
};

export default NotFound;
