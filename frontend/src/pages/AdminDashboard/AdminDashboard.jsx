import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store, Utensils, ShoppingBag, Star, Ticket, CreditCard, Heart } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardStats } from '../../api/adminApi';
import Loader from '../../components/Loader/Loader';
import { motion } from 'framer-motion';
import AdminUsers from './AdminUsers';
import AdminRestaurants from './AdminRestaurants';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';
import AdminCoupons from './AdminCoupons';
import AdminCategories from './AdminCategories';
import AdminCollections from './AdminCollections';
import AdminOffers from './AdminOffers';
import AdminReviews from './AdminReviews';

const AdminDashboard = () => {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Wait until auth is resolved
    if (authLoading) return;

    // Redirect non-admins
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    // Fetch stats only once when overview is first loaded
    const fetchStats = async () => {
      setStatsLoading(true);
      setStatsError('');
      try {
        const res = await getDashboardStats(token);
        setStats(res.data?.stats || res.data || {});
      } catch (err) {
        const msg = err?.response?.data?.message || 'Failed to load statistics';
        setStatsError(msg);
        console.error('[AdminDashboard] getDashboardStats error:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [authLoading, isAuthenticated, user, token, navigate]);

  // Block render until auth is resolved
  if (authLoading) return <Loader fullPage />;

  // Redirect is handled in useEffect, show nothing in the meantime
  if (!isAuthenticated || user?.role !== 'admin') return null;

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: <Users size={24} />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Restaurants', value: stats?.totalRestaurants ?? '—', icon: <Store size={24} />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Menu Items', value: stats?.totalMenuItems ?? '—', icon: <Utensils size={24} />, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Orders', value: stats?.totalOrders ?? '—', icon: <ShoppingBag size={24} />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Reviews', value: stats?.totalReviews ?? '—', icon: <Star size={24} />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Coupons', value: stats?.totalCoupons ?? '—', icon: <Ticket size={24} />, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Payments', value: stats?.totalPayments ?? '—', icon: <CreditCard size={24} />, color: 'text-teal-500', bg: 'bg-teal-500/10' },
    { label: 'Wishlists', value: stats?.totalWishlists ?? '—', icon: <Heart size={24} />, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'users', label: 'Users' },
    { key: 'restaurants', label: 'Restaurants' },
    { key: 'menu', label: 'Menu' },
    { key: 'orders', label: 'Orders' },
    { key: 'categories', label: 'Categories' },
    { key: 'collections', label: 'Collections' },
    { key: 'offers', label: 'Offers' },
    { key: 'coupons', label: 'Coupons' },
    { key: 'reviews', label: 'Reviews' },
  ];

  return (
    <div className="min-h-screen bg-surface px-4 md:px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header card with tabs */}
        <div className="rounded-[32px] border border-outline-variant/20 bg-white p-6 md:p-8 shadow-premium mb-8">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-display text-headline-lg font-black text-on-surface">Admin Dashboard</h1>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Welcome back, <span className="font-bold text-primary">{user?.name || 'Admin'}</span>. Here is your platform overview.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-full font-bold text-label-md transition-all border ${
                    activeTab === tab.key
                      ? 'bg-primary text-white shadow-sm border-primary'
                      : 'text-on-surface-variant border-outline-variant/30 hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {statsLoading && (
              <div className="py-12">
                <Loader />
              </div>
            )}
            {statsError && !statsLoading && (
              <div className="text-center py-12 text-error font-bold bg-error/5 rounded-3xl border border-error/20">
                {statsError}
              </div>
            )}
            {!statsLoading && !statsError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-card rounded-[24px] p-6 border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-label-md font-bold uppercase tracking-wider">{stat.label}</p>
                      <p className="font-display text-headline-md font-black text-on-surface mt-1">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Module Tabs */}
        {activeTab === 'users' && <AdminUsers token={token} />}
        {activeTab === 'restaurants' && <AdminRestaurants token={token} />}
        {activeTab === 'menu' && <AdminMenu token={token} />}
        {activeTab === 'orders' && <AdminOrders token={token} />}
        {activeTab === 'categories' && <AdminCategories token={token} />}
        {activeTab === 'collections' && <AdminCollections token={token} />}
        {activeTab === 'offers' && <AdminOffers token={token} />}
        {activeTab === 'coupons' && <AdminCoupons token={token} />}
        {activeTab === 'reviews' && <AdminReviews token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
