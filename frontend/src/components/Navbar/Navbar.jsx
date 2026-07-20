import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, MapPin, User, UtensilsCrossed, ChevronDown } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { getAvatar, DEFAULT_AVATAR } from '../../utils/imageAssets';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isScrolled } = useScrollDirection();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Browse', path: '/' },
    { label: 'Offers', path: '/offers' },
    { label: 'Collections', path: '/collections' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full border border-white/20 z-50 flex justify-between items-center px-6 md:px-8 py-3 transition-all duration-300
          ${isScrolled ? 'glass-pill shadow-nav bg-white/80' : 'bg-white/70 backdrop-blur-md shadow-sm'}
        `}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary text-white p-2 rounded-full shadow-md shadow-primary/20 flex items-center justify-center">
            <UtensilsCrossed size={18} />
          </div>
          <span className="font-display text-headline-md font-extrabold text-primary tracking-tighter">
            Zomato
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-label-lg font-bold transition-all duration-200 relative pb-1
                  ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary hover:scale-105'}
                `}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-white/50 rounded-full transition-all">
            <MapPin size={20} />
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary-container shadow-lg shadow-primary/10 transition-all active:scale-95 text-label-lg relative"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white rounded-full flex items-center justify-center text-[10px] font-black"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          {/* Authentication Controls */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-outline-variant/30 text-on-surface hover:bg-surface-container rounded-full transition-all select-none"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-primary/20">
                    <img src={getAvatar(user.avatar || user.profilePhoto || user.image, DEFAULT_AVATAR, user.name)} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-label-lg capitalize">{user.name}</span>
                  <ChevronDown size={14} className={`text-on-surface-variant transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Invisible backdrop to close dropdown on click outside */}
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-outline-variant/35 shadow-premium p-2.5 z-20"
                      >
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => { setDropdownOpen(false); navigate('/admin'); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-primary/5 hover:text-primary rounded-xl font-bold text-label-md transition-colors text-primary flex items-center gap-2"
                          >
                            Admin Panel
                          </button>
                        )}
                        {user?.role === 'restaurantOwner' && (
                          <button
                            onClick={() => { setDropdownOpen(false); navigate('/owner'); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-primary/5 hover:text-primary rounded-xl font-bold text-label-md transition-colors text-primary flex items-center gap-2"
                          >
                            Owner Panel
                          </button>
                        )}
                        <button
                          onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-surface-container hover:text-on-surface rounded-xl font-bold text-label-md transition-colors flex items-center gap-2 text-on-surface-variant"
                        >
                          Profile Settings
                        </button>
                        <button
                          onClick={() => { setDropdownOpen(false); navigate('/orders'); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-surface-container hover:text-on-surface rounded-xl font-bold text-label-md transition-colors flex items-center gap-2 text-on-surface-variant"
                        >
                          Your Orders
                        </button>
                        <button
                          onClick={() => { setDropdownOpen(false); navigate('/wishlist'); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-surface-container hover:text-on-surface rounded-xl font-bold text-label-md transition-colors flex items-center gap-2 text-on-surface-variant"
                        >
                          Wishlist
                        </button>
                        <div className="border-t border-outline-variant/10 my-1.5" />
                        <button
                          onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="w-full text-left px-4 py-2.5 text-error hover:bg-error/5 rounded-xl font-bold text-label-md transition-colors flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          <span>Log Out</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 border border-primary/20 text-primary font-bold rounded-full hover:bg-primary/5 transition-all active:scale-95 text-label-lg"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-5 py-2 bg-on-background text-white font-bold rounded-full hover:bg-on-background/90 transition-all active:scale-95 text-label-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Mobile Menu button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Cart Icon Button on mobile */}
          <button
            onClick={() => navigate('/cart')}
            className="p-2 text-on-surface-variant hover:text-primary rounded-full transition-colors relative"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[9px] font-black">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-primary rounded-full transition-all"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
            />
            {/* Menu Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-surface z-50 md:hidden p-8 flex flex-col justify-between shadow-2xl border-l border-outline-variant/20"
            >
              <div className="space-y-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary text-white p-1.5 rounded-full flex items-center justify-center">
                      <UtensilsCrossed size={16} />
                    </div>
                    <span className="font-display text-headline-sm font-extrabold text-primary">
                      Zomato
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-on-surface-variant hover:text-primary rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-headline-sm font-bold text-on-surface hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Profile Actions */}
              <div className="border-t border-outline-variant/15 pt-6 space-y-4">
                {isAuthenticated ? (
                  <>
                    <div
                      onClick={() => {
                        navigate('/profile');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                        <img src={getAvatar(user.avatar || user.profilePhoto || user.image, DEFAULT_AVATAR, user.name)} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-body-md group-hover:text-primary transition-colors capitalize">
                          {user.name}
                        </p>
                        <p className="text-label-sm text-on-surface-variant/70">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => {
                            navigate('/admin');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full py-3 border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 rounded-full font-bold transition-all text-label-lg"
                        >
                          Admin Panel
                        </button>
                      )}
                      {user?.role === 'restaurantOwner' && (
                        <button
                          onClick={() => {
                            navigate('/owner');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full py-3 border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 rounded-full font-bold transition-all text-label-lg"
                        >
                          Owner Panel
                        </button>
                      )}
                      <button
                        onClick={() => {
                          navigate('/orders');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 border border-outline-variant/40 hover:border-primary text-on-surface-variant hover:text-primary rounded-full font-bold transition-all text-label-lg"
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          navigate('/wishlist');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 border border-outline-variant/40 hover:border-primary text-on-surface-variant hover:text-primary rounded-full font-bold transition-all text-label-lg"
                      >
                        Wishlist
                      </button>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 border border-outline-variant/40 hover:border-primary text-on-surface-variant hover:text-primary py-3 rounded-full font-bold transition-all text-label-lg"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 border border-primary/20 text-primary font-bold rounded-full hover:bg-primary/5 transition-all text-label-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 bg-on-background text-white font-bold rounded-full hover:bg-on-background/90 transition-all text-label-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
