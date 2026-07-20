import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Tag, Calendar, Check, Store } from 'lucide-react';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../../api/offerApi';
import { getRestaurants } from '../../api/restaurantApi';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

const AdminOffers = ({ token }) => {
  const [offers, setOffers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    discount: '',
    validTill: '',
    restaurants: [],
    isActive: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [offerRes, restRes] = await Promise.all([
        getOffers(),
        getRestaurants(),
      ]);
      setOffers(offerRes.data.offers || offerRes.data || []);
      setRestaurants(restRes.data.restaurants || restRes.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch offers and restaurants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setSelectedOffer(null);
    setFormData({
      title: '',
      description: '',
      code: '',
      discount: '',
      validTill: '',
      restaurants: [],
      isActive: true,
    });
    setFormModalOpen(true);
  };

  const openEdit = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      title: offer.title || '',
      description: offer.description || '',
      code: offer.code || '',
      discount: offer.discount || '',
      validTill: offer.validTill ? new Date(offer.validTill).toISOString().split('T')[0] : '',
      restaurants: offer.restaurants?.map((r) => r._id || r) || [],
      isActive: offer.isActive !== undefined ? offer.isActive : true,
    });
    setFormModalOpen(true);
  };

  const openDelete = (offer) => {
    setSelectedOffer(offer);
    setDeleteModalOpen(true);
  };

  const handleRestaurantToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.restaurants.includes(id);
      if (exists) {
        return { ...prev, restaurants: prev.restaurants.filter((rid) => rid !== id) };
      } else {
        return { ...prev, restaurants: [...prev.restaurants, id] };
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...formData,
        discount: Number(formData.discount),
      };

      if (selectedOffer) {
        await updateOffer(selectedOffer._id, payload, token);
      } else {
        await createOffer(payload, token);
      }
      setFormModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to save offer');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteOffer(selectedOffer._id, token);
      setDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="py-12"><Loader /></div>;
  if (error) return <div className="text-center py-20 text-error font-bold">{error}</div>;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-headline-sm font-black text-on-surface">Offers</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {offers.length} Offers
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> New Offer
        </Button>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No offers found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer._id} className="p-6 border border-outline-variant/30 rounded-3xl flex flex-col justify-between gap-4 hover:border-primary/50 transition-colors bg-surface-container-lowest">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <Tag size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-body-lg text-on-surface capitalize">{offer.title}</h3>
                    <p className="text-label-sm font-bold text-primary tracking-wider uppercase mt-0.5">Code: {offer.code}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${offer.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {offer.isActive ? 'Active' : 'Paused'}
                </span>
              </div>

              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                {offer.description}
              </p>

              {offer.restaurants && offer.restaurants.length > 0 && (
                <div className="text-[11px] text-on-surface-variant/80 border-t border-outline-variant/10 pt-3">
                  <span className="font-bold">Applicable Restaurants: </span>
                  {offer.restaurants.map((r) => r.name || r).join(', ')}
                </div>
              )}

              <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4 mt-2">
                <div className="flex items-center gap-1.5 text-label-sm text-on-surface-variant">
                  <Calendar size={14} />
                  <span>Valid Till: {new Date(offer.validTill).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(offer)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => openDelete(offer)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedOffer ? "Edit Offer" : "Create Offer"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <Input label="Offer Title" placeholder="e.g. 20% off on Italian dishes" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <Input label="Description" placeholder="e.g. Get 20% discount on ordering any pizza" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Promo Code" placeholder="e.g. ITALIA20" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} required />
            <Input label="Discount (Flat Value / %)" type="number" min="0" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} required />
          </div>

          <Input label="Valid Till" type="date" value={formData.validTill} onChange={(e) => setFormData({...formData, validTill: e.target.value})} required />

          {/* Restaurant selection list */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Select Restaurants</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest max-h-40 overflow-y-auto">
              {restaurants.map((r) => {
                const isSelected = formData.restaurants.includes(r._id);
                return (
                  <div
                    key={r._id}
                    onClick={() => handleRestaurantToggle(r._id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all select-none
                      ${isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant bg-white hover:border-primary/35'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Store size={16} />
                      <span className="font-bold text-body-sm capitalize">{r.name}</span>
                    </div>
                    {isSelected && <Check size={16} strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.isActive} onChange={() => setFormData({...formData, isActive: true})} className="text-primary" />
                <span className="font-medium text-body-md">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!formData.isActive} onChange={() => setFormData({...formData, isActive: false})} className="text-primary" />
                <span className="font-medium text-body-md">Paused</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedOffer ? 'Save Changes' : 'Create Offer'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Offer">
        {selectedOffer && (
          <div className="text-center py-4">
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Delete Offer?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete the offer code <strong>{selectedOffer.code}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Offer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOffers;
