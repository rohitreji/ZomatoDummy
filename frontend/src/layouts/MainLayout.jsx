import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Container */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Container */}
      <Footer />
    </div>
  );
};

export default MainLayout;
