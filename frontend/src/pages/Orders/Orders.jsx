import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, PackageOpen } from 'lucide-react';
import Button from '../../components/Button/Button';
import { getOrdersByUser } from '../../api/orderApi';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';
import { formatCurrency } from '../../utils/currency';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getOrdersByUser(user._id);
        const data = res.data?.orders || res.data || [];
        // Sort orders by most recent first
        const sortedData = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        setOrders(sortedData);
      } catch (err) {
        console.error('Failed to load orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-tertiary bg-tertiary/10 border-tertiary/20';
      case 'Cancelled':
        return 'text-error bg-error/10 border-error/20';
      case 'Out for Delivery':
      case 'Preparing':
        return 'text-blue-600 bg-blue-50/50 border-blue-200';
      default:
        return 'text-secondary bg-secondary/10 border-secondary/20';
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center gap-4">
        <p className="text-error text-body-lg font-semibold">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 shadow-sm">
          <PackageOpen size={36} className="stroke-[1.5]" />
        </div>
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          No Orders Placed Yet
        </h1>
        <p className="text-on-surface-variant text-body-sm mb-4 leading-relaxed">
          You haven't ordered anything yet. Discover your favorite meals and place your first order!
        </p>
        <Button variant="primary" onClick={() => navigate('/')} className="w-full">
          Order Now
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-4">
      <div className="mb-8">
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          Your Orders
        </h1>
        <p className="text-on-surface-variant text-body-sm mt-1">
          Track active orders and review past meals
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const dateStr = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
            : 'Unknown Date';

          const itemsList = Array.isArray(order.items)
            ? order.items.map((it) => `${it.menuItem?.name || 'Item'} x ${it.quantity}`)
            : [];

          return (
            <div
              key={order._id}
              className="glass-card rounded-3xl p-6 border border-outline-variant/30 shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              {/* Left side details */}
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-label-lg font-bold text-on-surface-variant select-all">
                    Order ID: {order._id}
                  </span>
                  <span className={`px-3 py-1 rounded-full border text-label-sm font-black uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-body-lg font-extrabold text-on-surface">
                    {order.restaurant?.name || 'Restaurant'}
                  </h3>
                  <p className="text-on-surface-variant text-label-lg mt-0.5">{dateStr}</p>
                </div>

                <div className="text-body-sm text-on-surface-variant pl-4 border-l-2 border-outline-variant/30 space-y-1">
                  {itemsList.map((it, idx) => (
                    <p key={idx}>{it}</p>
                  ))}
                </div>
              </div>

              {/* Right side calculation / CTA */}
              <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-4 border-t border-outline-variant/10 pt-4 md:pt-0 md:border-t-0">
                <div className="text-left md:text-right">
                  <p className="text-on-surface-variant text-label-lg font-bold">Total Amount</p>
                  <p className="font-display text-headline-sm font-black text-primary">
                    {formatCurrency(order.totalAmount || 0)}
                  </p>
                </div>

                <Button
                  variant={order.orderStatus === 'Preparing' || order.orderStatus === 'Out for Delivery' ? 'primary' : 'outline'}
                  onClick={() => navigate('/')}
                  className="font-bold flex items-center justify-center gap-1.5"
                >
                  <span>{order.orderStatus === 'Preparing' || order.orderStatus === 'Out for Delivery' ? 'Track Live' : 'Re-order'}</span>
                  <ChevronRight size={14} />
                </Button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
