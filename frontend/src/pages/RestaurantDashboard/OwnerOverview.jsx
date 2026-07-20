import React, { useState } from 'react';
import { Store, Save, RefreshCw, AlertTriangle } from 'lucide-react';
import { createRestaurant, updateRestaurant } from '../../api/restaurantApi';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const OwnerOverview = ({ restaurant, ownerId, token, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: restaurant?.name || '',
    owner: ownerId,
    description: restaurant?.description || '',
    cuisine: Array.isArray(restaurant?.cuisine) ? restaurant.cuisine.join(', ') : (restaurant?.cuisine || ''),
    address: restaurant?.address || '',
    city: restaurant?.city || '',
    phone: restaurant?.phone || '',
    openingTime: restaurant?.openingTime || '09:00',
    closingTime: restaurant?.closingTime || '22:00',
    image: restaurant?.image || '',
    isApproved: restaurant?.isApproved || false,
    isActive: restaurant?.isActive !== undefined ? restaurant.isActive : true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        cuisine: formData.cuisine.split(',').map((c) => c.trim()).filter(Boolean),
      };

      if (restaurant?._id) {
        await updateRestaurant(restaurant._id, payload);
        setSuccess('Restaurant details updated successfully!');
      } else {
        await createRestaurant(payload);
        setSuccess('Restaurant profile created successfully!');
      }
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to save restaurant details');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-display text-headline-sm font-black text-on-surface">Restaurant Profile</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            {restaurant ? 'Update your business information and operating hours' : 'Set up your restaurant profile to get started'}
          </p>
        </div>
        {restaurant && (
          <span className={`px-3 py-1 rounded-full text-label-sm font-black uppercase tracking-wider ${restaurant.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {restaurant.isApproved ? 'Approved' : 'Pending Approval'}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-error/10 text-error rounded-2xl border border-error/20 font-bold text-body-sm flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-100 text-green-700 rounded-2xl border border-green-200 font-bold text-body-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Restaurant Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Cuisines (comma separated)"
            placeholder="e.g. Italian, Fast Food, Desserts"
            value={formData.cuisine}
            onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
            required
          />
          <Input
            label="Cover Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          <Input
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Opening Time"
            type="time"
            value={formData.openingTime}
            onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
            required
          />
          <Input
            label="Closing Time"
            type="time"
            value={formData.closingTime}
            onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
            required
          />
        </div>

        <div className="border-t border-outline-variant/20 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface-variant">Restaurant Status</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: true })}
                  className="text-primary"
                />
                <span className="font-medium text-body-md text-green-600">Active (Visible to customers)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={!formData.isActive}
                  onChange={() => setFormData({ ...formData, isActive: false })}
                  className="text-primary"
                />
                <span className="font-medium text-body-md text-red-500">Disabled (Hidden from listings)</span>
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" loading={saving} disabled={saving} className="flex items-center gap-2 min-w-[150px]">
            <Save size={18} />
            <span>Save Profile</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OwnerOverview;
