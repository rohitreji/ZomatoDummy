import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Folder, CheckCircle, XCircle } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';

const AdminCategories = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    isActive: true,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data?.categories || res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setSelectedCategory(null);
    setFormData({
      name: '',
      image: '',
      description: '',
      isActive: true,
    });
    setFormModalOpen(true);
  };

  const openEdit = (cat) => {
    setSelectedCategory(cat);
    setFormData({
      name: cat.name || '',
      image: cat.image || '',
      description: cat.description || '',
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
    setFormModalOpen(true);
  };

  const openDelete = (cat) => {
    setSelectedCategory(cat);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, formData, token);
      } else {
        await createCategory(formData, token);
      }
      setFormModalOpen(false);
      fetchCategories();
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
      await deleteCategory(selectedCategory._id, token);
      setDeleteModalOpen(false);
      fetchCategories();
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
          <h2 className="font-display text-headline-sm font-black text-on-surface">Categories</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {categories.length} Categories
          </span>
        </div>
        <Button variant="primary" onClick={openCreate} className="flex items-center gap-2">
          <Plus size={18} /> New Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No categories found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Image</th>
                <th className="pb-4 font-bold">Name</th>
                <th className="pb-4 font-bold">Description</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {categories.map((c) => (
                <tr key={c._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container flex items-center justify-center text-primary">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <Folder size={20} />
                      )}
                    </div>
                  </td>
                  <td className="py-4 font-bold text-on-surface capitalize">{c.name}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant max-w-[200px] truncate">{c.description || '—'}</td>
                  <td className="py-4">
                    <span className={`flex items-center gap-1 text-label-sm font-bold ${c.isActive ? 'text-green-600' : 'text-red-500'}`}>
                      {c.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {c.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openEdit(c)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDelete(c)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
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
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)} title={selectedCategory ? "Edit Category" : "Create Category"}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input label="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <Input label="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          <Input label="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={formData.isActive} onChange={() => setFormData({...formData, isActive: true})} className="text-primary" />
                <span className="font-medium text-body-md">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!formData.isActive} onChange={() => setFormData({...formData, isActive: false})} className="text-primary" />
                <span className="font-medium text-body-md">Disabled</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-outline-variant/30">
            <Button variant="ghost" onClick={() => setFormModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>
              {selectedCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Category">
        {selectedCategory && (
          <div className="text-center py-4">
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Are you sure?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete category <strong>{selectedCategory.name}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Category
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCategories;
