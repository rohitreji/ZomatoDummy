import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Plus, Minus, Trash2, Ticket, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';
import { getCouponByCode } from '../../api/couponApi';
import { formatCurrency } from '../../utils/currency';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    deliveryFee,
    serviceFee,
    tax,
    total,
    promoCode,
    promoDiscount,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    const code = promoInput.trim();
    if (!code) return;

    if (promoCode) {
      setPromoError('A coupon is already applied. Remove it first.');
      return;
    }

    setPromoLoading(true);
    setPromoError('');

    try {
      const res = await getCouponByCode(code);
      const coupon = res.data.coupon;

      if (!coupon.isActive) {
        setPromoError('This coupon is no longer active.');
        return;
      }
      if (new Date(coupon.expiryDate) < new Date()) {
        setPromoError('This coupon has expired.');
        return;
      }
      if (coupon.minimumOrderAmount > 0 && subtotal < coupon.minimumOrderAmount) {
        setPromoError(`Min. order ₹${coupon.minimumOrderAmount} required for this coupon.`);
        return;
      }

      const payableBeforeDiscount = subtotal + deliveryFee + serviceFee + tax;
      const minPayable = 1;

      if (payableBeforeDiscount <= minPayable) {
        setPromoError(`Your cart total is already at or below the minimum payable amount of ₹${minPayable}.`);
        return;
      }

      // Compute discount amount
      let discount = 0;
      if (coupon.discountType === 'Percentage') {
        discount = (subtotal * coupon.discountValue) / 100;
      } else {
        // Flat discount
        discount = coupon.discountValue;
      }

      if (coupon.maximumDiscount > 0) {
        discount = Math.min(discount, coupon.maximumDiscount);
      }

      // Cap the discount so final total doesn't fall below minPayable
      if (payableBeforeDiscount - discount < minPayable) {
        discount = payableBeforeDiscount - minPayable;
      }
      discount = Math.max(0, discount);
      discount = Number(discount.toFixed(2));

      // Dispatch to CartContext with validated code and computed amount
      applyPromo(coupon.code, discount);
      setPromoInput('');
    } catch (err) {
      const msg = err?.response?.data?.message;
      setPromoError(msg === 'Coupon not found' ? 'Invalid promo code.' : (msg || 'Failed to validate coupon.'));
    } finally {
      setPromoLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 shadow-sm">
          <ShoppingBag size={36} className="stroke-[1.5]" />
        </div>
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          Your Cart is Empty
        </h1>
        <p className="text-on-surface-variant text-body-sm mb-4 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Browse restaurants and discover tasty meals nearby.
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
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
              1
            </div>
            <span className="font-bold text-label-md text-primary">Cart</span>
          </div>
          <div className="flex-1 h-[2px] bg-primary/30 mx-4" />
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold border border-outline-variant/30">
              2
            </div>
            <span className="font-bold text-label-md text-on-surface-variant">Checkout</span>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart items */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-card">
            <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-6">
              Your Order
            </h2>

            <div className="divide-y divide-outline-variant/10">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-4 items-stretch group first:pt-0 last:pb-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-display text-body-lg font-extrabold text-on-surface leading-tight capitalize">
                            {item.name}
                          </h3>
                          <p className="text-label-sm text-on-surface-variant/70 font-semibold mt-1">
                            Sold by {item.restaurantName}
                          </p>
                        </div>
                        <span className="font-bold text-primary text-body-lg">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/40">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors text-primary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-bold text-body-sm select-none">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors text-primary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-error hover:text-error/80 flex items-center gap-1 font-bold text-label-md select-none"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order calculations summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-premium">
            <h2 className="font-display text-headline-sm font-extrabold text-on-surface mb-6">
              Bill Summary
            </h2>

            {/* Promo Code Inset */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  disabled={!!promoCode || promoLoading}
                  className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-full pl-6 pr-24 outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!promoInput || !!promoCode || promoLoading}
                  className="absolute right-2 top-1.5 h-9 px-4 bg-secondary text-white rounded-full font-bold text-label-md hover:bg-primary transition-colors disabled:opacity-50 select-none flex items-center justify-center"
                >
                  {promoLoading ? '...' : 'Apply'}
                </button>
              </div>
              {promoError && (
                <p className="text-error text-label-sm font-semibold mt-2 px-2">{promoError}</p>
              )}

              {/* Display Applied Promo badge */}
              {promoCode && (
                <div className="mt-3 flex items-center justify-between bg-tertiary/10 border border-tertiary/20 text-tertiary px-4 py-2.5 rounded-2xl animate-fade-in-up">
                  <div className="flex items-center gap-2 text-label-md font-bold">
                    <Ticket size={16} />
                    <span>Coupon "{promoCode}" applied</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-error font-extrabold text-label-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-3.5 text-on-surface-variant text-label-lg font-bold border-b border-outline-variant/20 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-on-surface">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-tertiary">Free</span>
                ) : (
                  <span className="text-on-surface">{formatCurrency(deliveryFee)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="text-on-surface">{formatCurrency(serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8.5%)</span>
                <span className="text-on-surface">{formatCurrency(tax)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-tertiary">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(promoDiscount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-headline-sm text-on-surface font-black pt-4">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/checkout')}
              className="w-full mt-8 flex items-center justify-center gap-2"
              icon={<ArrowRight size={18} />}
            >
              Proceed to Checkout
            </Button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Cart;
