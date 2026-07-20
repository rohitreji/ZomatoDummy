import React, { useEffect, useState } from 'react';
import { Trash2, Star, ShieldAlert, AlertTriangle } from 'lucide-react';
import { getReviews, deleteReview } from '../../api/reviewApi';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';

const AdminReviews = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getReviews();
      setReviews(res.data.reviews || res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openDelete = (rev) => {
    setSelectedReview(rev);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteReview(selectedReview._id, token);
      setDeleteModalOpen(false);
      fetchReviews();
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
          <h2 className="font-display text-headline-sm font-black text-on-surface">Review Moderation</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm inline-block mt-2">
            {reviews.length} Reviews
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-medium">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant text-label-sm uppercase tracking-wider">
                <th className="pb-4 font-bold">Restaurant</th>
                <th className="pb-4 font-bold">User</th>
                <th className="pb-4 font-bold">Rating</th>
                <th className="pb-4 font-bold">Comment</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {reviews.map((rev) => {
                const dateStr = rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'N/A';
                return (
                  <tr key={rev._id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="py-4 font-bold text-on-surface capitalize">{rev.restaurant?.name || 'Unknown Restaurant'}</td>
                    <td className="py-4 text-body-sm font-semibold text-on-surface capitalize">{rev.user?.name || 'Anonymous'}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1 text-yellow-500 font-bold text-body-sm">
                        <span>{rev.rating}</span>
                        <Star size={12} fill="currentColor" />
                      </div>
                    </td>
                    <td className="py-4 text-body-sm text-on-surface-variant max-w-[250px] truncate" title={rev.comment}>
                      {rev.comment}
                    </td>
                    <td className="py-4 text-body-sm text-on-surface-variant">{dateStr}</td>
                    <td className="py-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => openDelete(rev)}
                        className="p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
                        title="Delete (Moderate)"
                      >
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Moderate Review">
        {selectedReview && (
          <div className="text-center py-4">
            <ShieldAlert size={48} className="mx-auto text-error mb-4 opacity-80" />
            <h3 className="font-display text-headline-sm font-black text-on-surface mb-2">Delete this review?</h3>
            <p className="text-on-surface-variant text-body-md mb-8">
              This will permanently delete the review by <strong>{selectedReview.user?.name || 'Anonymous'}</strong> for <strong>{selectedReview.restaurant?.name || 'restaurant'}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete} loading={actionLoading} disabled={actionLoading}>
                Delete Review
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminReviews;
