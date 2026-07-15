import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, CheckCircle2, ChevronRight, PackageOpen } from 'lucide-react';
import Button from '../../components/Button/Button';

const Orders = () => {
  const navigate = useNavigate();

  // Mocking order items
  const orders = [
    {
      id: 'Z-8472948',
      restaurantName: 'The Poke Palace',
      date: 'July 10, 2026',
      status: 'Preparing',
      statusColor: 'text-secondary bg-secondary/10 border-secondary/20',
      total: 34.50,
      items: ['Signature Poke Bowl x 1', 'Spicy Salmon Crunch Roll x 1'],
    },
    {
      id: 'Z-1948293',
      restaurantName: 'Mario\'s Pizzeria',
      date: 'July 08, 2026',
      status: 'Delivered',
      statusColor: 'text-tertiary bg-tertiary/10 border-tertiary/20',
      total: 21.00,
      items: ['Classic Pepperoni Pizza x 1'],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 mt-4">
      <div className="mb-8">
        <h1 className="font-display text-headline-lg font-black text-on-surface">
          Your Orders
        </h1>
        <p className="text-on-surface-variant text-body-sm mt-1">
          Track active orders and review past meals
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="glass-card rounded-3xl p-6 border border-outline-variant/30 shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            {/* Left side details */}
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-label-lg font-bold text-on-surface-variant select-all">
                  Order ID: {order.id}
                </span>
                <span className={`px-3 py-1 rounded-full border text-label-sm font-black uppercase tracking-wider ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>

              <div>
                <h3 className="font-display text-body-lg font-extrabold text-on-surface">
                  {order.restaurantName}
                </h3>
                <p className="text-on-surface-variant text-label-lg mt-0.5">{order.date}</p>
              </div>

              <div className="text-body-sm text-on-surface-variant pl-4 border-l-2 border-outline-variant/30 space-y-1">
                {order.items.map((it, idx) => (
                  <p key={idx}>{it}</p>
                ))}
              </div>
            </div>

            {/* Right side calculation / CTA */}
            <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-4 border-t border-outline-variant/10 pt-4 md:pt-0 md:border-t-0">
              <div className="text-left md:text-right">
                <p className="text-on-surface-variant text-label-lg font-bold">Total Amount</p>
                <p className="font-display text-headline-sm font-black text-primary">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <Button
                variant={order.status === 'Preparing' ? 'primary' : 'outline'}
                onClick={() => navigate('/')}
                className="font-bold flex items-center justify-center gap-1.5"
              >
                <span>{order.status === 'Preparing' ? 'Track Live' : 'Re-order'}</span>
                <ChevronRight size={14} />
              </Button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
