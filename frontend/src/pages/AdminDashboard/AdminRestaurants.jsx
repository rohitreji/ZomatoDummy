import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Eye, ShieldAlert, Plus, Store } from 'lucide-react';
import { getRestaurants } from '../../api/restaurantApi';
import { createAdminRestaurant, updateAdminRestaurant, deleteAdminRestaurant, getAllUsers } from '../../api/adminApi';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';

const AdminRestaurants = ({ token }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [owners, setOwners] = useState([]);
  const [ownersLoaded, setOwnersLoaded] = useState(false);

  // Modals state
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    description: '',
    cuisine: '',
    address: '',
    city: '',
    phone: '',
    openingTime: '09:00',
    closingTime: '22:00',
    isApproved: false,
  });

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await getRestaurants();
      setRestaurants(res.data.restaurants || []);
    } catch (err) {
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    if (ownersLoaded) return;
    try {
      const res = await getAllUsers(token);
      setOwners(res.data);
      setOwnersLoaded(true);
    } catch (err) {
      console.error('Failed to load users for owner selection');
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const openView = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setViewModalOpen(true);
  };

  const openCreate = () => {
    setSelectedRestaurant(null);
    setFormData({
      name: '', owner: '', description: '', cuisine: '', address: '', city: '', phone: '', openingTime: '09:00', closingTime: '22:00', isApproved: false
    });
    fetchOwners();
    setFormModalOpen(true);
  };

  const openEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setFormData({
      name: restaurant.name || '',
      owner: restaurant.owner || '',
      description: restaurant.description || '',
      cuisine: Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : (restaurant.cuisine || ''),
      address: restaurant.address || '',
      city: restaurant.city || '',
      phone: restaurant.phone || '',
      openingTime: restaurant.openingTime || '09:00',
      closingTime: restaurant.closingTime || '22:00',
      isApproved: restaurant.isApproved || false,
    });
    fetchOwners();
    setFormModalOpen(true);
  };

  const openDelete = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...formData,
        cuisine: formData.cuisine.split(',').map(c => c.trim()).filter(Boolean)
      };

      if (selectedRestaurant) {
        await updateAdminRestaurant(selectedRestaurant._id, payload, token);
      } else {
        await createAdminRestaurant(payload, token);
      }
      setFormModalOpen(false);
      fetchRestaurants();
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
      await deleteAdminRestaurant(selectedRestaurant._id, token);
      setDeleteModalOpen(false);
      fetchRestaurants();
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
          <h2 className="font-display text-headline-sm font-black text-on-surface">Restaurant Management</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {restaurants.length} Restaurants
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> New Restaurant
        </Button>
      </div>

      {restaurants.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No restaurants found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Restaurant</th>
                <th className="pb-4 font-bold">City</th>
                <th className="pb-4 font-bold">Cuisine</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {restaurants.map((r) => (
                <tr key={r._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4">
                    <p className="text-body-md font-bold text-on-surface capitalize">{r.name}</p>
                    <p className="text-label-sm text-on-surface-variant">{r.rating} ★ Rating</p>
                  </td>
                  <td className="py-4 text-body-sm text-on-surface-variant capitalize">{r.city}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant max-w-[150px] truncate">
                    {Array.isArray(r.cuisine) ? r.cuisine.join(', ') : r.cuisine}
                  </td>
                  <td className="py-4">
                    <span className={`flex items-center gap-1 text-label-sm font-bold ${r.isApproved ? 'text-green-600' : 'text-red-500'}`}>
                      {r.isApproved ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {r.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openView(r)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openEdit(r)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDelete(r)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Restaurant Details">
        {selectedRestaurant && (
          <div className="space-y-4 text-body-md text-on-surface">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 bg-surface-container flex items-center justify-center text-primary">
                {selectedRestaurant.image ? (
                  <img src={selectedRestaurant.image} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <Store size={32} />
                )}
              </div>
              <div>
                <p className="font-bold text-headline-sm capitalize">{selectedRestaurant.name}</p>
                <p className="text-on-surface-variant">{selectedRestaurant.address}, {selectedRestaurant.city}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
              <div className="col-span-2">
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Description</p>
                <p className="font-medium">{selectedRestaurant.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Cuisine</p>
                <p className="font-medium capitalize">{Array.isArray(selectedRestaurant.cuisine) ? selectedRestaurant.cuisine.join(', ') : selectedRestaurant.cuisine}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Phone</p>
                <p className="font-medium">{selectedRestaurant.phone}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Timings</p>
                <p className="font-medium">{selectedRestaurant.openingTime} - {selectedRestaurant.closingTime}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Status</p>
                <p className={`font-medium ${selectedRestaurant.isApproved ? 'text-green-600' : 'text-red-500'}`}>
                  {selectedRestaurant.isApproved ? 'Approved' : 'Pending Approval'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <Input label="Restaurant Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Owner</label>
            <select 
              value={formData.owner} 
              onChange={(e) => setFormData({...formData, owner: e.target.value})}
              className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            >
              <option value="">Select Owner</option>
              {owners.map(user => (
                <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
              ))}
            </select>
          </div>

          <Input label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          <Input label="Cuisine (comma separated)" placeholder="Italian, Chinese" value={formData.cuisine} onChange={(e) => setFormData({...formData, cuisine: e.target.value})} required />
          <Input label="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
          <Input label="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
          <Input label="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Opening Time" type="time" value={formData.openingTime} onChange={(e) => setFormData({...formData, openingTime: e.target.value})} required />
            <Input label="Closing Time" type="time" value={formData.closingTime} onChange={(e) => setFormData({...formData, closingTime: e.target.value})} required />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Approval Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.isApproved} onChange={() => setFormData({...formData, isApproved: true})} className="text-primary" />
                <span className="font-medium text-body-md">Approved</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!formData.isApproved} onChange={() => setFormData({...formData, isApproved: false})} className="text-primary" />
                <span className="font-medium text-body-md">Pending</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedRestaurant ? 'Save Changes' : 'Create Restaurant'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Restaurant">
        {selectedRestaurant && (
          <div className="text-center py-4">
            <ShieldAlert size={48} className="mx-auto text-error mb-4 opacity-80" />
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Are you absolutely sure?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete <strong>{selectedRestaurant.name}</strong> and all associated menu items and data.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Restaurant
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminRestaurants;
