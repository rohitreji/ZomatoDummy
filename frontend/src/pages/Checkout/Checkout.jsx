import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Briefcase, MapPin, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { motion } from 'framer-motion';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, subtotal, deliveryFee, tax, serviceFee, promoDiscount, clearCart } = useCart();

  const [activeAddress, setActiveAddress] = useState('home');
  const [activePayment, setActivePayment] = useState('card');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const addresses = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={18} />,
      line1: '4521 Sunset Blvd, Suite 402',
      line2: 'Los Angeles, CA 90027',
    },
    {
      id: 'office',
      label: 'Office',
      icon: <Briefcase size={18} />,
      line1: '789 Tech Plaza, 12th Floor',
      line2: 'Santa Monica, CA 90401',
    },
  ];

  const handlePlaceOrder = () => {
    // Open Success confirmation dialog
    setSuccessModalOpen(true);
  };

  const handleModalClose = () => {
    setSuccessModalOpen(false);
    clearCart();
    navigate('/orders');
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
              <button className="text-primary font-display text-label-lg font-bold flex items-center gap-1 hover:underline">
                + Add New
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => {
                const isActive = activeAddress === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setActiveAddress(addr.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer relative transition-all duration-200 select-none
                      ${isActive ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant bg-white hover:border-primary/50'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute top-4 right-4 text-primary">
                        <CheckCircle size={20} fill="currentColor" className="text-white" />
                      </div>
                    )}
                    <div className="flex items-center gap-2.5 mb-3 font-display font-bold text-body-lg text-on-surface capitalize">
                      <span className="text-primary">{addr.icon}</span>
                      <span>{addr.label}</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm">{addr.line1}</p>
                    <p className="text-on-surface-variant text-body-sm">{addr.line2}</p>
                  </div>
                );
              })}
            </div>
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
            >
              Place Order
            </Button>
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
    </div>
  );
};

export default Checkout;
