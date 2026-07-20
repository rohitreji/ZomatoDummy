import React, { useEffect, useState } from 'react';
import { Edit, Eye, ShoppingBag, MapPin, Clock, CreditCard } from 'lucide-react';
import { getAllAdminOrders, updateAdminOrder } from '../../api/adminApi';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import { formatCurrency } from '../../utils/currency';

const AdminOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Status Form State
  const [editOrderStatus, setEditOrderStatus] = useState('');
  const [editPaymentStatus, setEditPaymentStatus] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminOrders(token);
      setOrders(res.data.orders || res.data || []);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openView = (order) => {
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const openEditStatus = (order) => {
    setSelectedOrder(order);
    setEditOrderStatus(order.orderStatus);
    setEditPaymentStatus(order.paymentStatus);
    setStatusModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        orderStatus: editOrderStatus,
        paymentStatus: editPaymentStatus,
      };

      await updateAdminOrder(selectedOrder._id, payload, token);
      setStatusModalOpen(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to update order status');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Paid':
        return 'text-green-600 bg-green-100';
      case 'Cancelled':
      case 'Failed':
        return 'text-red-600 bg-red-100';
      case 'Out for Delivery':
      case 'Preparing':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  if (loading) return <div className="py-12"><Loader /></div>;
  if (error) return <div className="text-center py-20 text-error font-bold">{error}</div>;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-headline-sm font-black text-on-surface">Order Management</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {orders.length} Orders
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Order ID & Date</th>
                <th className="pb-4 font-bold">Customer</th>
                <th className="pb-4 font-bold">Restaurant</th>
                <th className="pb-4 font-bold">Total</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4">
                    <p className="text-body-md font-bold text-on-surface uppercase font-mono tracking-tighter">#{order._id.substring(order._id.length - 6)}</p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="text-body-md font-bold text-on-surface capitalize">{order.user?.name || 'Guest'}</p>
                    <p className="text-label-sm text-on-surface-variant">{order.user?.email || 'N/A'}</p>
                  </td>
                  <td className="py-4 text-body-sm font-bold text-on-surface capitalize">
                    {order.restaurant?.name || 'Unknown'}
                  </td>
                  <td className="py-4 text-body-md font-bold text-primary">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-4 space-y-1">
                    <div className={`px-2 py-0.5 inline-block rounded-md text-label-sm font-bold w-max ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </div>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openView(order)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="View Details">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openEditStatus(order)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Update Status">
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Order Details">
        {selectedOrder && (
          <div className="space-y-6 text-body-md text-on-surface max-h-[70vh] overflow-y-auto px-1">

            {/* Header Info */}
            <div className="flex justify-between items-start border-b border-outline-variant/30 pb-4">
              <div>
                <p className="font-display font-black text-headline-sm uppercase tracking-tighter">
                  ORDER #{selectedOrder._id.substring(selectedOrder._id.length - 8)}
                </p>
                <p className="text-on-surface-variant text-label-sm mt-1">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-headline-sm text-primary">{formatCurrency(selectedOrder.totalAmount)}</p>
                <span className={`px-2 py-0.5 rounded-md text-label-sm font-bold ${getStatusColor(selectedOrder.paymentStatus)} mt-1 inline-block`}>
                  {selectedOrder.paymentStatus} ({selectedOrder.paymentMethod})
                </span>
              </div>
            </div>

            {/* Customer & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
                <p className="text-label-sm text-on-surface-variant uppercase font-bold mb-2 flex items-center gap-1"><ShoppingBag size={14} /> Restaurant</p>
                <p className="font-bold capitalize text-body-lg">{selectedOrder.restaurant?.name || 'Unknown'}</p>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
                <p className="text-label-sm text-on-surface-variant uppercase font-bold mb-2 flex items-center gap-1"><MapPin size={14} /> Delivery details</p>
                <p className="font-bold capitalize">{selectedOrder.user?.name || 'Guest'}</p>
                <p className="text-on-surface-variant mt-1 text-label-md leading-tight">{selectedOrder.deliveryAddress}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase font-bold mb-3">Order Items</p>
              <div className="space-y-3">
                {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <div className="bg-surface-container text-on-surface-variant font-bold w-8 h-8 rounded-lg flex items-center justify-center text-label-md">
                        {item.quantity}x
                      </div>
                      <p className="font-bold text-body-md capitalize">{item.menuItem?.name || 'Unknown Item'}</p>
                    </div>
                    <p className="font-bold text-body-md text-on-surface-variant">{formatCurrency(item.menuItem?.price ? item.menuItem.price * item.quantity : 0)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex justify-between items-center">
              <span className="font-bold text-primary text-label-lg">Order Status</span>
              <span className={`px-3 py-1 rounded-lg text-label-md font-black uppercase ${getStatusColor(selectedOrder.orderStatus)}`}>
                {selectedOrder.orderStatus}
              </span>
            </div>

          </div>
        )}
      </Modal>

      {/* Edit Status Modal */}
      <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="Update Order Status">
        {selectedOrder && (
          <form onSubmit={handleUpdateStatus} className="space-y-6">
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20 mb-6">
              <p className="text-label-sm text-on-surface-variant font-bold">Order ID: <span className="font-mono text-on-surface">{selectedOrder._id}</span></p>
              <p className="text-label-sm text-on-surface-variant font-bold mt-1">Customer: <span className="text-on-surface">{selectedOrder.user?.name}</span></p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">Delivery Status</label>
              <select
                value={editOrderStatus}
                onChange={(e) => setEditOrderStatus(e.target.value)}
                className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold"
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant flex items-center gap-1"><CreditCard size={16} /> Payment Status</label>
              <select
                value={editPaymentStatus}
                onChange={(e) => setEditPaymentStatus(e.target.value)}
                className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-outline-variant/30">
              <Button variant="ghost" onClick={() => setStatusModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>Update Status</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;
