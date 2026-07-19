import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Eye, ShieldAlert, Plus, Ticket, CalendarX } from 'lucide-react';
import { getCoupons } from '../../api/couponApi';
import { createAdminCoupon, updateAdminCoupon, deleteAdminCoupon } from '../../api/adminApi';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';

const AdminCoupons = ({ token }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'Percentage',
    discountValue: '',
    minimumOrderAmount: '',
    maximumDiscount: '',
    expiryDate: '',
    isActive: true,
  });

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await getCoupons();
      setCoupons(res.data.coupons || res.data || []);
    } catch (err) {
      setError('Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const openView = (coupon) => {
    setSelectedCoupon(coupon);
    setViewModalOpen(true);
  };

  const openCreate = () => {
    setSelectedCoupon(null);
    setFormData({
      code: '',
      description: '',
      discountType: 'Percentage',
      discountValue: '',
      minimumOrderAmount: '',
      maximumDiscount: '',
      expiryDate: '',
      isActive: true,
    });
    setFormModalOpen(true);
  };

  const openEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code || '',
      description: coupon.description || '',
      discountType: coupon.discountType || 'Percentage',
      discountValue: coupon.discountValue || '',
      minimumOrderAmount: coupon.minimumOrderAmount || 0,
      maximumDiscount: coupon.maximumDiscount || 0,
      expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate).toISOString().split('T')[0] : '',
      isActive: coupon.isActive !== undefined ? coupon.isActive : true,
    });
    setFormModalOpen(true);
  };

  const openDelete = (coupon) => {
    setSelectedCoupon(coupon);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = { ...formData };

      if (selectedCoupon) {
        await updateAdminCoupon(selectedCoupon._id, payload, token);
      } else {
        await createAdminCoupon(payload, token);
      }
      setFormModalOpen(false);
      fetchCoupons();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteAdminCoupon(selectedCoupon._id, token);
      setDeleteModalOpen(false);
      fetchCoupons();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const isExpired = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  if (loading) return <div className="py-12"><Loader /></div>;
  if (error) return <div className="text-center py-20 text-error font-bold">{error}</div>;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-headline-sm font-black text-on-surface">Coupon Management</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {coupons.length} Coupons
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> New Coupon
        </Button>
      </div>

      {coupons.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No coupons found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Code</th>
                <th className="pb-4 font-bold">Discount</th>
                <th className="pb-4 font-bold">Expiry</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {coupons.map((coupon) => {
                const expired = isExpired(coupon.expiryDate);
                return (
                  <tr key={coupon._id} className={`transition-colors ${expired ? 'bg-error/5 hover:bg-error/10' : 'hover:bg-surface-container-lowest'}`}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${expired ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                          <Ticket size={18} />
                        </div>
                        <p className="text-body-md font-bold text-on-surface uppercase tracking-wider">{coupon.code}</p>
                      </div>
                    </td>
                    <td className="py-4 text-body-sm font-bold text-on-surface">
                      {coupon.discountType === 'Percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                    </td>
                    <td className="py-4 text-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-1">
                        {expired && <CalendarX size={14} className="text-error" />}
                        <span className={expired ? 'text-error font-bold' : ''}>
                          {new Date(coupon.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1 text-label-sm font-bold w-max px-2 py-0.5 rounded-md ${coupon.isActive && !expired ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {coupon.isActive && !expired ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {coupon.isActive ? (expired ? 'Expired' : 'Active') : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 text-right flex justify-end gap-2">
                      <button onClick={() => openView(coupon)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => openEdit(coupon)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => openDelete(coupon)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Coupon Details">
        {selectedCoupon && (
          <div className="space-y-4 text-body-md text-on-surface">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 text-center mb-6">
              <p className="font-display font-black text-headline-lg uppercase tracking-widest text-primary border-2 border-dashed border-primary inline-block px-6 py-2 rounded-xl bg-white">
                {selectedCoupon.code}
              </p>
              <p className="mt-3 font-bold text-body-lg">
                {selectedCoupon.discountType === 'Percentage' ? `${selectedCoupon.discountValue}% OFF` : `₹${selectedCoupon.discountValue} OFF`}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
              <div className="col-span-2">
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Description</p>
                <p className="font-medium">{selectedCoupon.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Min Order Amount</p>
                <p className="font-medium">₹{selectedCoupon.minimumOrderAmount || 0}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Max Discount</p>
                <p className="font-medium">₹{selectedCoupon.maximumDiscount || 0}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Expiry Date</p>
                <p className={`font-medium ${isExpired(selectedCoupon.expiryDate) ? 'text-error' : ''}`}>
                  {new Date(selectedCoupon.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Status</p>
                <p className={`font-medium ${selectedCoupon.isActive ? 'text-green-600' : 'text-red-500'}`}>
                  {selectedCoupon.isActive ? 'Active' : 'Deactivated'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedCoupon ? "Edit Coupon" : "Add Coupon"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <Input 
            label="Coupon Code" 
            placeholder="e.g. SAVE50, FESTIVE20" 
            value={formData.code} 
            onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} 
            required 
            className="uppercase font-bold tracking-widest"
          />
          <Input 
            label="Description" 
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">Discount Type</label>
              <select 
                value={formData.discountType} 
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Flat">Flat Amount (₹)</option>
              </select>
            </div>
            <Input 
              label="Discount Value" 
              type="number" 
              min="0" 
              value={formData.discountValue} 
              onChange={(e) => setFormData({...formData, discountValue: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Min Order Amount (₹)" 
              type="number" 
              min="0" 
              value={formData.minimumOrderAmount} 
              onChange={(e) => setFormData({...formData, minimumOrderAmount: e.target.value})} 
            />
            <Input 
              label="Max Discount (₹)" 
              type="number" 
              min="0" 
              value={formData.maximumDiscount} 
              onChange={(e) => setFormData({...formData, maximumDiscount: e.target.value})} 
            />
          </div>

          <Input 
            label="Expiry Date" 
            type="date" 
            value={formData.expiryDate} 
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} 
            required 
          />

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.isActive} onChange={() => setFormData({...formData, isActive: true})} className="text-primary" />
                <span className="font-medium text-body-md text-green-600">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!formData.isActive} onChange={() => setFormData({...formData, isActive: false})} className="text-primary" />
                <span className="font-medium text-body-md text-red-500">Deactivated</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedCoupon ? 'Save Changes' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Coupon">
        {selectedCoupon && (
          <div className="text-center py-4">
            <ShieldAlert size={48} className="mx-auto text-error mb-4 opacity-80" />
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Are you absolutely sure?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete the coupon <strong>{selectedCoupon.code}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Coupon
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCoupons;
