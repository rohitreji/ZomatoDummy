import React, { useEffect, useState } from 'react';
import { ShoppingBag, Clock, MapPin, Phone, User, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { formatCurrency } from '../../utils/currency';

const OwnerOrders = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    if (!restaurantId) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/order/restaurant/${restaurantId}`);
      const list = res.data.orders || [];
      // Sort orders by most recent first
      const sorted = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (err) {
      console.error(err);
      setError('Failed to load restaurant orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [restaurantId]);

  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/order/${orderId}`, { orderStatus: status });
      // Update state locally
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: status } : o))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Preparing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return <div className="py-12"><Loader /></div>;
  if (error) return <div className="text-center py-20 text-error font-bold">{error}</div>;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-headline-sm font-black text-on-surface">Incoming Orders</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {orders.length} Total Orders
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No orders received yet.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A';
            const customerName = order.user?.name || 'Anonymous';
            const customerEmail = order.user?.email || 'N/A';
            
            return (
              <div key={order._id} className="p-6 border border-outline-variant/30 rounded-3xl flex flex-col md:flex-row justify-between gap-6 hover:border-primary/40 transition-colors bg-surface-container-lowest">
                {/* Details list */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-label-md font-bold text-on-surface-variant">Order ID: {order._id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusBadgeClass(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                    <span className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <Clock size={12} />
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-body-sm text-on-surface-variant">
                    <div className="flex items-center gap-2 font-bold text-on-surface">
                      <User size={14} className="text-primary" />
                      <span>{customerName} ({customerEmail})</span>
                    </div>
                    <div className="flex items-start gap-2 mt-1">
                      <MapPin size={14} className="text-primary mt-0.5" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/10 pt-3 space-y-1.5">
                    <p className="text-label-sm font-bold uppercase text-on-surface-variant tracking-wider">Dishes ordered:</p>
                    {order.items?.map((it, idx) => (
                      <p key={idx} className="text-body-sm text-on-surface font-semibold capitalize">
                        • {it.menuItem?.name || 'Dish'} <span className="text-primary font-bold">x {it.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Status transitions */}
                <div className="flex flex-col justify-between items-end gap-4 border-t md:border-t-0 border-outline-variant/10 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-label-sm font-bold text-on-surface-variant">Total Amount</p>
                    <p className="font-display text-headline-sm font-black text-primary">{formatCurrency(order.totalAmount)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {order.orderStatus === 'Pending' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => updateStatus(order._id, 'Preparing')}
                          disabled={updatingId === order._id}
                          className="flex items-center gap-1 font-bold text-label-sm py-2 px-4"
                        >
                          <CheckCircle size={14} /> Accept
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => updateStatus(order._id, 'Cancelled')}
                          disabled={updatingId === order._id}
                          className="flex items-center gap-1 font-bold text-label-sm py-2 px-4"
                        >
                          <XCircle size={14} /> Reject
                        </Button>
                      </>
                    )}

                    {order.orderStatus === 'Preparing' && (
                      <Button
                        variant="primary"
                        onClick={() => updateStatus(order._id, 'Out for Delivery')}
                        disabled={updatingId === order._id}
                        className="font-bold text-label-sm py-2 px-4"
                      >
                        Ship Order
                      </Button>
                    )}

                    {order.orderStatus === 'Out for Delivery' && (
                      <Button
                        variant="primary"
                        onClick={() => updateStatus(order._id, 'Delivered')}
                        disabled={updatingId === order._id}
                        className="font-bold text-label-sm py-2 px-4"
                      >
                        Mark as Delivered
                      </Button>
                    )}

                    {order.orderStatus !== 'Pending' && order.orderStatus !== 'Cancelled' && (
                      <div className="flex flex-col gap-1.5 items-end">
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase">Change Status</label>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          disabled={updatingId === order._id}
                          className="bg-surface-container-low border border-outline-variant rounded-xl px-3 py-1.5 outline-none font-bold text-label-md text-on-surface"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OwnerOrders;
