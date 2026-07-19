import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Briefcase, MapPin, ArrowRight, ShieldCheck, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import { motion } from 'framer-motion';
import { getAddressesByUser, createAddress, deleteAddress } from '../../api/addressApi';

// Map addressType string → lucide icon
const addressIcon = (type) => {
  if (type === 'Work') return <Briefcase size={18} />;
  if (type === 'Other') return <MapPin size={18} />;
  return <Home size={18} />;
};

const EMPTY_FORM = {
  fullName: '',
  phone: '',
  houseNo: '',
  street: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
  addressType: 'Home',
  isDefault: false,
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, total, subtotal, deliveryFee, tax, serviceFee, promoDiscount, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [activeAddress, setActiveAddress] = useState(null);
  const [activePayment, setActivePayment] = useState('card');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formSaving, setFormSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch user's saved addresses from backend
  useEffect(() => {
    if (!user?._id) {
      setAddressesLoading(false);
      return;
    }
    getAddressesByUser(user._id)
      .then((res) => {
        const list = res.data.addresses || [];
        setAddresses(list);
        // Pre-select default address or first one
        const def = list.find((a) => a.isDefault) || list[0];
        if (def) setActiveAddress(def._id);
      })
      .catch((err) => console.error('Failed to load addresses:', err))
      .finally(() => setAddressesLoading(false));
  }, [user]);

  const handlePlaceOrder = () => {
    setSuccessModalOpen(true);
  };

  const handleModalClose = () => {
    setSuccessModalOpen(false);
    clearCart();
    navigate('/orders');
  };

  const handleFormChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSaving(true);
    try {
      const res = await createAddress({ ...formData, user: user._id });
      const newAddr = res.data.address;
      setAddresses((prev) => [newAddr, ...prev]);
      if (!activeAddress) setActiveAddress(newAddr._id);
      setFormData(EMPTY_FORM);
      setAddModalOpen(false);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || 'Failed to save address. Please try again.'
      );
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteAddress = async (id, e) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      if (activeAddress === id) {
        const remaining = addresses.filter((a) => a._id !== id);
        setActiveAddress(remaining[0]?._id || null);
      }
    } catch (err) {
      console.error('Failed to delete address:', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 shadow-sm">
          <ShoppingBag size={36} />
        </div>
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          Cart is Empty
        </h1>
        <p className="text-on-surface-variant text-body-sm mb-4">
          Add items to your cart first to continue checkout.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} className="w-full">
          Browse Cuisines
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 mt-4">
      {/* Stepper Progress bar */}
      <div className="max-w-3xl mx-auto mb-12 px-4 select-none">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold border border-primary/40">
              ✓
            </div>
            <span className="font-bold text-label-md text-on-surface-variant">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-primary mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
              2
            </div>
            <span className="font-bold text-label-md text-primary">Checkout</span>
          </div>
        </div>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Delivery Address and Payment Options */}
        <div className="lg:col-span-8 space-y-6">
          {/* Delivery Address Box */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-headline-lg font-extrabold text-on-surface">
                Delivery Address
              </h2>
              <button
                onClick={() => { setFormData(EMPTY_FORM); setFormError(''); setAddModalOpen(true); }}
                className="text-primary font-display text-label-lg font-bold flex items-center gap-1 hover:underline"
              >
                + Add New
              </button>
            </div>

            {addressesLoading ? (
              <div className="text-center py-6 text-on-surface-variant text-body-sm">
                Loading addresses...
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant/60 flex flex-col items-center gap-2">
                <MapPin size={32} className="stroke-[1.5]" />
                <p className="text-body-sm font-medium">No saved addresses. Add one to continue.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const isActive = activeAddress === addr._id;
                  return (
                    <div
                      key={addr._id}
                      onClick={() => setActiveAddress(addr._id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer relative transition-all duration-200 select-none group
                        ${isActive ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant bg-white hover:border-primary/50'}
                      `}
                    >
                      {isActive && (
                        <div className="absolute top-4 right-4 text-primary">
                          <CheckCircle size={20} fill="currentColor" className="text-white" />
                        </div>
                      )}

                      {/* Delete button — visible on hover when not active-selected indicator area */}
                      {!isActive && (
                        <button
                          onClick={(e) => handleDeleteAddress(addr._id, e)}
                          disabled={deletingId === addr._id}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-error hover:border-error/40 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-30"
                          title="Delete address"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                      <div className="flex items-center gap-2.5 mb-3 font-display font-bold text-body-lg text-on-surface capitalize">
                        <span className="text-primary">{addressIcon(addr.addressType)}</span>
                        <span>{addr.addressType}</span>
                      </div>
                      <p className="text-on-surface-variant text-body-sm">{addr.houseNo}, {addr.street}</p>
                      <p className="text-on-surface-variant text-body-sm">{addr.city}, {addr.state} – {addr.pincode}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payment Option Selection box */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-card">
            <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-6">
              Payment Method
            </h2>

            <div className="space-y-3 select-none">
              <label
                onClick={() => setActivePayment('card')}
                className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all
                  ${activePayment === 'card' ? 'border-primary bg-primary/5' : 'border-outline-variant bg-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={activePayment === 'card'}
                    onChange={() => {}}
                    className="text-primary focus:ring-primary h-4 w-4 border-outline-variant"
                  />
                  <span className="font-bold text-body-md text-on-surface">Credit / Debit Card</span>
                </div>
              </label>

              <label
                onClick={() => setActivePayment('cash')}
                className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all
                  ${activePayment === 'cash' ? 'border-primary bg-primary/5' : 'border-outline-variant bg-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={activePayment === 'cash'}
                    onChange={() => {}}
                    className="text-primary focus:ring-primary h-4 w-4 border-outline-variant"
                  />
                  <span className="font-bold text-body-md text-on-surface">Cash on Delivery (COD)</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Calculations review & CTA button */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-premium">
            <h2 className="font-display text-headline-sm font-extrabold text-on-surface mb-6">
              Summary
            </h2>

            <div className="space-y-3.5 text-on-surface-variant text-label-lg font-bold border-b border-outline-variant/20 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-tertiary">Free</span>
                ) : (
                  <span className="text-on-surface">${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="text-on-surface">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="text-on-surface">${tax.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-tertiary">
                  <span>Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-headline-sm text-on-surface font-black pt-4 mb-6">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              onClick={handlePlaceOrder}
              className="w-full flex items-center justify-center gap-2"
              icon={<ArrowRight size={18} />}
              disabled={!activeAddress}
            >
              Place Order
            </Button>
            {!activeAddress && !addressesLoading && (
              <p className="text-label-sm text-on-surface-variant/60 text-center mt-2">
                Select a delivery address to continue
              </p>
            )}
          </div>
        </aside>

      </div>

      {/* Success Modal confirmation dialog */}
      <Modal isOpen={successModalOpen} onClose={handleModalClose} title="Order Confirmed! 🎉">
        <div className="text-center py-4 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary mb-2 shadow-sm">
            <ShieldCheck size={36} />
          </div>
          <p className="text-on-surface-variant text-body-md leading-relaxed">
            Your food order has been successfully placed. You will be redirected to check tracking details in a moment.
          </p>
          <Button variant="primary" onClick={handleModalClose} className="w-full">
            Track Order
          </Button>
        </div>
      </Modal>

      {/* Add Address Modal */}
      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add New Address">
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="addr-fullName"
              label="Full Name"
              placeholder="Rohit Reji"
              value={formData.fullName}
              onChange={handleFormChange('fullName')}
              required
            />
            <Input
              id="addr-phone"
              label="Phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleFormChange('phone')}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="addr-houseNo"
              label="House / Flat No."
              placeholder="A-101"
              value={formData.houseNo}
              onChange={handleFormChange('houseNo')}
              required
            />
            <Input
              id="addr-street"
              label="Street / Area"
              placeholder="MG Road"
              value={formData.street}
              onChange={handleFormChange('street')}
              required
            />
          </div>

          <Input
            id="addr-landmark"
            label="Landmark (optional)"
            placeholder="Near City Mall"
            value={formData.landmark}
            onChange={handleFormChange('landmark')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              id="addr-city"
              label="City"
              placeholder="Bengaluru"
              value={formData.city}
              onChange={handleFormChange('city')}
              required
            />
            <Input
              id="addr-state"
              label="State"
              placeholder="Karnataka"
              value={formData.state}
              onChange={handleFormChange('state')}
              required
            />
            <Input
              id="addr-pincode"
              label="Pincode"
              placeholder="560001"
              value={formData.pincode}
              onChange={handleFormChange('pincode')}
              required
            />
          </div>

          {/* Address Type selector — matches existing border/bg pattern */}
          <div className="flex flex-col gap-1.5">
            <label className="text-label-lg font-bold text-on-surface-variant select-none">
              Address Type
            </label>
            <div className="flex gap-3">
              {['Home', 'Work', 'Other'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, addressType: type }))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-label-lg font-bold transition-all
                    ${formData.addressType === type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                    }`}
                >
                  {addressIcon(type)}
                  {type}
                </button>
              ))}
            </div>
          </div>

          {formError && (
            <p className="text-label-sm text-error font-medium px-1">{formError}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={formSaving}
            disabled={formSaving}
            icon={<Plus size={16} />}
          >
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Checkout;
