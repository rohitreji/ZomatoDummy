import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Share2, Phone, Smartphone, Download, UtensilsCrossed } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-surface-container-highest border-t border-outline-variant/30 rounded-t-[40px] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate('/')}>
            <div className="bg-primary text-white p-2 rounded-full flex items-center justify-center">
              <UtensilsCrossed size={18} />
            </div>
            <span className="font-display text-headline-md font-extrabold text-primary tracking-tighter">
              Zomato
            </span>
          </div>
          <p className="text-on-surface-variant text-body-sm leading-relaxed max-w-xs">
            Redefining urban dining, one meticulously curated meal at a time. Speed meets quality.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <Globe size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              <Share2 size={18} />
            </a>
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-label-lg font-extrabold uppercase tracking-wider text-on-surface">
            Company
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              About Us
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Careers
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Newsletter
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Impact
            </a>
          </div>
        </div>

        {/* Support Column */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-label-lg font-extrabold uppercase tracking-wider text-on-surface">
            Support
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Help Center
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-body-sm font-medium">
              Partner with Us
            </a>
          </div>
        </div>

        {/* Apps Column */}
        <div className="flex flex-col gap-4">
          <p className="font-display text-label-lg font-extrabold uppercase tracking-wider text-on-surface">
            Get the App
          </p>
          <div className="flex flex-col gap-3">
            <button className="bg-on-background text-white p-3.5 rounded-2xl flex items-center gap-3.5 hover:bg-on-background/90 transition-all text-left shadow-sm active:scale-98">
              <Smartphone size={24} className="opacity-80" />
              <div>
                <p className="text-[10px] uppercase opacity-70 leading-none mb-1 font-bold">
                  Download on the
                </p>
                <p className="text-body-sm font-bold leading-none">App Store</p>
              </div>
            </button>
            <button className="bg-on-background text-white p-3.5 rounded-2xl flex items-center gap-3.5 hover:bg-on-background/90 transition-all text-left shadow-sm active:scale-98">
              <Download size={24} className="opacity-80" />
              <div>
                <p className="text-[10px] uppercase opacity-70 leading-none mb-1 font-bold">
                  Get it on
                </p>
                <p className="text-body-sm font-bold leading-none">Google Play</p>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-outline-variant/20 text-center">
        <p className="text-on-surface-variant text-label-lg font-medium">
          © {new Date().getFullYear()} Zomato Urban Gastronomy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
