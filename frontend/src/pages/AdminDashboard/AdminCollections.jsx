import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, FolderHeart, Check, Store } from 'lucide-react';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../../api/collectionApi';
import { getRestaurants } from '../../api/restaurantApi';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

const AdminCollections = ({ token }) => {
  const [collections, setCollections] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    restaurants: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [colRes, restRes] = await Promise.all([
        getCollections(),
        getRestaurants(),
      ]);
      setCollections(colRes.data.collections || colRes.data || []);
      setRestaurants(restRes.data.restaurants || restRes.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch collections and restaurants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreate = () => {
    setSelectedCollection(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      restaurants: [],
    });
    setFormModalOpen(true);
  };

  const openEdit = (col) => {
    setSelectedCollection(col);
    setFormData({
      title: col.title || '',
      description: col.description || '',
      image: col.image || '',
      restaurants: col.restaurants?.map((r) => r._id || r) || [],
    });
    setFormModalOpen(true);
  };

  const openDelete = (col) => {
    setSelectedCollection(col);
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
      if (selectedCollection) {
        await updateCollection(selectedCollection._id, formData, token);
      } else {
        await createCollection(formData, token);
      }
      setFormModalOpen(false);
      fetchData();
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
      await deleteCollection(selectedCollection._id, token);
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
          <h2 className="font-display text-headline-sm font-black text-on-surface">Collections</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {collections.length} Collections
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> New Collection
        </Button>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No collections found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Image</th>
                <th className="pb-4 font-bold">Title</th>
                <th className="pb-4 font-bold">Description</th>
                <th className="pb-4 font-bold">Restaurants Count</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {collections.map((col) => (
                <tr key={col._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container flex items-center justify-center text-primary">
                      {col.image ? (
                        <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                      ) : (
                        <FolderHeart size={20} />
                      )}
                    </div>
                  </td>
                  <td className="py-4 font-bold text-on-surface capitalize">{col.title}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant max-w-[200px] truncate">{col.description || '—'}</td>
                  <td className="py-4 font-semibold text-body-sm text-primary">{col.restaurants?.length || 0}</td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEdit(col)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDelete(col)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedCollection ? "Edit Collection" : "Create Collection"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <Input label="Collection Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <Input label="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          <Input label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

          {/* Restaurant Selection Checkboxes */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Select Restaurants</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest max-h-48 overflow-y-auto">
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

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedCollection ? 'Save Changes' : 'Create Collection'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Collection">
        {selectedCollection && (
          <div className="text-center py-4">
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Delete Collection?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete the collection <strong>{selectedCollection.title}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Collection
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCollections;
