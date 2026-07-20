import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Eye, ShieldAlert, Plus, Utensils } from 'lucide-react';
import { getMenuByRestaurant, createMenuItem, updateMenuItem, deleteMenuItem } from '../../api/menuApi';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';

const OwnerMenu = ({ restaurantId, token }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    restaurant: restaurantId,
    category: '',
    description: '',
    price: '',
    discount: '',
    image: '',
    isVeg: false,
    isAvailable: true,
  });

  const fetchMenu = async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const res = await getMenuByRestaurant(restaurantId);
      setMenuItems(res.data.menuItems || res.data || []);
    } catch (err) {
      setError('Failed to fetch menu items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  const openView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const openCreate = () => {
    setSelectedItem(null);
    setFormData({
      name: '',
      restaurant: restaurantId,
      category: '',
      description: '',
      price: '',
      discount: '0',
      image: '',
      isVeg: false,
      isAvailable: true,
    });
    setFormModalOpen(true);
  };

  const openEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name || '',
      restaurant: restaurantId,
      category: item.category || '',
      description: item.description || '',
      price: item.price || '',
      discount: item.discount || 0,
      image: item.image || '',
      isVeg: item.isVeg || false,
      isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
    });
    setFormModalOpen(true);
  };

  const openDelete = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
      };

      if (selectedItem) {
        await updateMenuItem(selectedItem._id, payload);
      } else {
        await createMenuItem(payload);
      }
      setFormModalOpen(false);
      fetchMenu();
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
      await deleteMenuItem(selectedItem._id);
      setDeleteModalOpen(false);
      fetchMenu();
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
          <h2 className="font-display text-headline-sm font-black text-on-surface">Menu Items</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {menuItems.length} Items
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> Add Dish
        </Button>
      </div>

      {menuItems.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No menu items found. Add some dishes to your menu!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Item</th>
                <th className="pb-4 font-bold">Category</th>
                <th className="pb-4 font-bold">Price</th>
                <th className="pb-4 font-bold">Discount</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {menuItems.map((item) => (
                <tr key={item._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} title={item.isVeg ? 'Veg' : 'Non-Veg'} />
                      <p className="text-body-md font-bold text-on-surface capitalize">{item.name}</p>
                    </div>
                  </td>
                  <td className="py-4 text-body-sm text-on-surface-variant capitalize">{item.category}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant font-medium text-primary">${item.price}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant font-medium">{item.discount || 0}%</td>
                  <td className="py-4">
                    <span className={`flex items-center gap-1 text-label-sm font-bold ${item.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                      {item.isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openView(item)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openEdit(item)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDelete(item)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
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
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Menu Item Details">
        {selectedItem && (
          <div className="space-y-4 text-body-md text-on-surface">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 bg-surface-container flex items-center justify-center text-primary">
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt="Dish" className="w-full h-full object-cover" />
                ) : (
                  <Utensils size={32} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedItem.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                  <p className="font-bold text-headline-sm capitalize">{selectedItem.name}</p>
                </div>
                <p className="text-on-surface-variant">${selectedItem.price} {selectedItem.discount > 0 && <span className="text-error font-medium ml-2 text-label-sm">({selectedItem.discount}% OFF)</span>}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
              <div className="col-span-2">
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Description</p>
                <p className="font-medium">{selectedItem.description || 'N/A'}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Category</p>
                <p className="font-medium capitalize">{selectedItem.category}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Dietary</p>
                <p className={`font-medium ${selectedItem.isVeg ? 'text-green-600' : 'text-red-500'}`}>
                  {selectedItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Status</p>
                <p className={`font-medium ${selectedItem.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                  {selectedItem.isAvailable ? 'Available' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedItem ? "Edit Dish" : "Add Dish"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          <Input label="Item Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          
          <Input label="Category" placeholder="e.g. Starters, Main Course, Desserts" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
          <Input label="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price ($)" type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            <Input label="Discount (%)" type="number" min="0" max="100" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} />
          </div>

          <Input label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">Dietary Preference</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={formData.isVeg} onChange={() => setFormData({...formData, isVeg: true})} className="text-primary" />
                  <span className="font-medium text-body-md text-green-600">Veg</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!formData.isVeg} onChange={() => setFormData({...formData, isVeg: false})} className="text-primary" />
                  <span className="font-medium text-body-md text-red-500">Non-Veg</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">Availability</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={formData.isAvailable} onChange={() => setFormData({...formData, isAvailable: true})} className="text-primary" />
                  <span className="font-medium text-body-md">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={!formData.isAvailable} onChange={() => setFormData({...formData, isAvailable: false})} className="text-primary" />
                  <span className="font-medium text-body-md">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedItem ? 'Save Changes' : 'Add to Menu'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Menu Item">
        {selectedItem && (
          <div className="text-center py-4">
            <ShieldAlert size={48} className="mx-auto text-error mb-4 opacity-80" />
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Are you absolutely sure?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete <strong>{selectedItem.name}</strong> from your menu.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Item
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OwnerMenu;
