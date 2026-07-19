import React, { useEffect, useState } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Eye, ShieldAlert } from 'lucide-react';
import { getAllUsers, updateAdminUser, deleteAdminUser } from '../../api/adminApi';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const AdminUsers = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Edit form state
  const [editRole, setEditRole] = useState('customer');
  const [editIsActive, setEditIsActive] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers(token);
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const openView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditIsActive(user.isActive);
    setEditModalOpen(true);
  };

  const openDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await updateAdminUser(selectedUser._id, { role: editRole, isActive: editIsActive }, token);
      setEditModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setActionLoading(true);
    try {
      await deleteAdminUser(selectedUser._id, token);
      setDeleteModalOpen(false);
      fetchUsers();
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
        <h2 className="font-display text-headline-sm font-black text-on-surface">User Management</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm">
          {users.length} Users
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Name</th>
                <th className="pb-4 font-bold">Email</th>
                <th className="pb-4 font-bold">Role</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-4 text-body-md font-bold text-on-surface capitalize">{u.name}</td>
                  <td className="py-4 text-body-sm text-on-surface-variant">{u.email}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-label-sm font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'restaurantOwner' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`flex items-center gap-1 text-label-sm font-bold ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                      {u.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 text-right flex justify-end gap-2">
                    <button onClick={() => openView(u)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => openEdit(u)} className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => openDelete(u)} className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors" title="Delete">
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
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="User Details">
        {selectedUser && (
          <div className="space-y-4 text-body-md text-on-surface">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-surface-container">
                {selectedUser.avatar ? (
                  <img src={selectedUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-headline-sm text-primary uppercase">
                    {selectedUser.name[0]}
                  </div>
                )}
              </div>
              <div>
                <p className="font-bold text-headline-sm capitalize">{selectedUser.name}</p>
                <p className="text-on-surface-variant">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant/20 pt-4">
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Role</p>
                <p className="font-medium capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Status</p>
                <p className={`font-medium ${selectedUser.isActive ? 'text-green-600' : 'text-red-500'}`}>
                  {selectedUser.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase font-bold">Joined</p>
                <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit User Role & Status">
        {selectedUser && (
          <form onSubmit={handleUpdateUser} className="space-y-6">
            <p className="text-body-sm text-on-surface-variant mb-4">Editing <strong className="text-on-surface">{selectedUser.name}</strong> ({selectedUser.email})</p>
            
            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">User Role</label>
              <select 
                value={editRole} 
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="customer">Customer</option>
                <option value="restaurantOwner">Restaurant Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-lg font-bold text-on-surface-variant">Account Status</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" checked={editIsActive} onChange={() => setEditIsActive(true)} className="text-primary focus:ring-primary" />
                  <span className="font-medium text-body-md">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" checked={!editIsActive} onChange={() => setEditIsActive(false)} className="text-primary focus:ring-primary" />
                  <span className="font-medium text-body-md">Deactivated</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="ghost" onClick={() => setEditModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={actionLoading} disabled={actionLoading}>Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete User">
        {selectedUser && (
          <div className="text-center py-4">
            <ShieldAlert size={48} className="mx-auto text-error mb-4 opacity-80" />
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Are you absolutely sure?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This action cannot be undone. This will permanently delete <strong>{selectedUser.name}</strong>'s account and remove their data from the servers.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDeleteUser} loading={actionLoading} disabled={actionLoading}>
                Delete User
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminUsers;
