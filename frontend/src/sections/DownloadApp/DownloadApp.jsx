import React from 'react';
import { Smartphone, Download } from 'lucide-react';

const DownloadApp = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="relative rounded-[40px] overflow-hidden min-h-[350px] flex items-center group shadow-premium bg-gradient-to-br from-primary via-primary-container to-secondary">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden lg:block select-none pointer-events-none">
          <div className="w-full h-full bg-radial-gradient from-white/30 to-transparent blur-xl" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-8 md:p-12 lg:ml-12 max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
          <h2 className="font-display text-headline-lg md:text-display-lg text-white font-extrabold mb-4 leading-tight">
            Elevate Your Dining Experience
          </h2>
          <p className="text-white/90 text-body-lg mb-8 leading-relaxed">
            Get the Zomato app to easily order food, track orders in real-time, and get exclusive Zomato Pro discounts of up to 60% on your phone.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3.5 bg-white text-primary font-bold rounded-full hover:bg-surface-container-highest transition-all flex items-center gap-2 text-label-lg shadow-lg active:scale-95">
              <Smartphone size={20} />
              <span>Download iOS App</span>
            </button>
            <button className="px-6 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/15 transition-all flex items-center gap-2 text-label-lg active:scale-95">
              <Download size={20} />
              <span>Get Android App</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
