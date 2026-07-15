import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // If user is not authenticated, redirect to login page
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const menuItems = [
    { label: 'Your Orders', icon: <ShoppingBag size={18} />, path: '/orders', desc: 'Manage your active & past orders' },
    { label: 'Wishlist', icon: <Heart size={18} />, path: '/wishlist', desc: 'Saved food spots you love' },
    { label: 'Manage Addresses', icon: <MapPin size={18} />, path: '/checkout', desc: 'Edit home or work destinations' },
    { label: 'Settings', icon: <Settings size={18} />, path: '#', desc: 'Configure notifications and password' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-4">
      {/* Profile Overview Header Card */}
      <div className="glass-card rounded-[32px] p-8 border border-outline-variant/30 shadow-premium flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/25 shadow-md flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <span className="px-3.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm font-black uppercase tracking-wider select-none">
            Gold Member
          </span>
          <h1 className="font-display text-headline-lg font-black text-on-surface capitalize mt-2 mb-1">
            {user.name}
          </h1>
          <p className="text-on-surface-variant text-body-sm">{user.email}</p>
        </div>
        <Button variant="outline" onClick={logout} className="font-bold flex-shrink-0">
          <LogOut size={16} className="mr-1" />
          <span>Log Out</span>
        </Button>
      </div>

      {/* Profile Navigation Menus grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className="p-6 rounded-2xl border border-outline-variant/30 bg-white hover:border-primary/50 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 group flex items-start gap-4 select-none"
          >
            <div className="bg-primary/5 text-primary p-3.5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <div>
              <h3 className="font-display text-body-lg font-extrabold text-on-surface group-hover:text-primary transition-colors">
                {item.label}
              </h3>
              <p className="text-on-surface-variant text-label-lg mt-1 leading-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
