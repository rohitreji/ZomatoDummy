import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BecomePartner = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Partner with us */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative h-[250px] rounded-[30px] overflow-hidden group cursor-pointer shadow-md"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdOqjr3BL1SEt4LoAs1Hin6wFeeQATiqvDQ1nB9nTCI2yVpneUNQZc4FVYZk9FUMDOqH8qVfff5xLPREPksXWqH1M5YcPp2R8TtTSOBsbod8iz7ap__hNAYwz5R68F1wL-6_qbofQS8kKwIOlJhXRzvXmO73FjdsoMJKhO6NnZI-kXaXsu8YqYBncJUiAjE4W0IpR7QwK--LImKhq8kyq6zjkbbibLEoSPXCPAK4wPSuzEXfiTlb82asiDfBvkQzpi0AqpKeh98ih-"
            alt="Become a Partner"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8 text-white max-w-md">
            <h3 className="font-display text-headline-lg font-black mb-2">Partner with Us</h3>
            <p className="text-white/80 text-body-sm mb-4">
              Join Zomato and reach thousands of hungry customers. Grow your restaurant business with ease.
            </p>
            <div className="flex items-center gap-1.5 font-bold hover:underline">
              <span>Register Restaurant</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>

        {/* Deliver with us */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative h-[250px] rounded-[30px] overflow-hidden group cursor-pointer shadow-md"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz4UnVUQvHf6BhQKzIn6lCBEYFnd9q9Lh_KOrL0JfhH2U88L9UA4QLNKo83wSpKbkCYoh2D-eNW9IvMMHSHAL2UHd5Gm53XN7VdwDLXzO-gxFwZ0U7vNIbYP7pimx6UTvrFhMTY6n4_gMH21wksqqR2kLNLQXAQcc8zczXxKmjw_Yqr8A2g7-r_6XYeoMzEMHjH89CwBF-CaNXDizXtyUmzI3L5IAWC4whzA8Gg0mKKGzc1ATHpm7JKgdCMQ3XaM2TQAWkcmYYaMe-"
            alt="Deliver with us"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center p-8 text-white max-w-md">
            <h3 className="font-display text-headline-lg font-black mb-2">Deliver with Us</h3>
            <p className="text-white/80 text-body-sm mb-4">
              Get flexible working hours, weekly payouts, and competitive earnings. Ride with Zomato today.
            </p>
            <div className="flex items-center gap-1.5 font-bold hover:underline">
              <span>Join Delivery Fleet</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BecomePartner;
