import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Utensils, Tag, ShoppingBag, FolderOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getRestaurantsByOwner } from '../../api/restaurantApi';
import Loader from '../../components/Loader/Loader';
import OwnerOverview from './OwnerOverview';
import OwnerMenu from './OwnerMenu';
import OwnerCategories from './OwnerCategories';
import OwnerOffers from './OwnerOffers';
import OwnerOrders from './OwnerOrders';

const RestaurantDashboard = () => {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [loadingRestaurant, setLoadingRestaurant] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchOwnerRestaurant = async () => {
    if (!user?._id) return;
    setLoadingRestaurant(true);
    try {
      const res = await getRestaurantsByOwner(user._id);
      const list = res.data.restaurants || [];
      if (list.length > 0) {
        setRestaurant(list[0]); // Select first restaurant for simplicity
      } else {
        setRestaurant(null);
      }
    } catch (err) {
      console.error('Error fetching owner restaurant:', err);
      setRestaurant(null);
    } finally {
      setLoadingRestaurant(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || (user?.role !== 'restaurantOwner' && user?.role !== 'admin')) {
      navigate('/');
      return;
    }

    fetchOwnerRestaurant();
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading || loadingRestaurant) return <Loader fullPage />;

  const tabs = [
    { key: 'overview', label: 'Overview', icon: <Store size={18} /> },
    { key: 'menu', label: 'Menu', icon: <Utensils size={18} />, disabled: !restaurant },
    { key: 'categories', label: 'Categories', icon: <FolderOpen size={18} />, disabled: !restaurant },
    { key: 'offers', label: 'Offers', icon: <Tag size={18} />, disabled: !restaurant },
    { key: 'orders', label: 'Orders', icon: <ShoppingBag size={18} />, disabled: !restaurant },
  ];

  return (
    <div className="min-h-screen bg-surface px-4 md:px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header container */}
        <div className="rounded-[32px] border border-outline-variant/20 bg-white p-6 md:p-8 shadow-premium mb-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-display text-headline-lg font-black text-on-surface">Restaurant Owner Panel</h1>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Welcome back, <span className="font-bold text-primary">{user?.name}</span>. Manage your business from this dashboard.
              </p>
            </div>

            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => !tab.disabled && setActiveTab(tab.key)}
                    disabled={tab.disabled}
                    className={`px-5 py-2.5 rounded-full font-bold text-label-md transition-all border flex items-center gap-2
                      ${isActive
                        ? 'bg-primary text-white shadow-sm border-primary'
                        : tab.disabled
                          ? 'text-on-surface-variant/40 border-outline-variant/10 cursor-not-allowed opacity-50'
                          : 'text-on-surface-variant border-outline-variant/30 hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab views */}
        <div className="transition-all duration-300">
          {activeTab === 'overview' && (
            <OwnerOverview
              restaurant={restaurant}
              ownerId={user?._id}
              token={token}
              onRefresh={fetchOwnerRestaurant}
            />
          )}

          {activeTab === 'menu' && restaurant && (
            <OwnerMenu restaurantId={restaurant._id} token={token} />
          )}

          {activeTab === 'categories' && restaurant && (
            <OwnerCategories restaurantId={restaurant._id} />
          )}

          {activeTab === 'offers' && restaurant && (
            <OwnerOffers restaurantId={restaurant._id} token={token} />
          )}

          {activeTab === 'orders' && restaurant && (
            <OwnerOrders restaurantId={restaurant._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
