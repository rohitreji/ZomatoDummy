import { useState } from 'react';
import { Send } from 'lucide-react';
import Button from '../../components/Button/Button';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-surface-container-low border-t border-outline-variant/15 w-full">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-2">
          Subscribe to our Newsletter
        </h2>
        <p className="text-on-surface-variant text-body-md mb-8">
          Get weekly updates on popular dishes, curated collections, and discount coupons.
        </p>

        {subscribed ? (
          <div className="bg-primary/10 text-primary border border-primary/20 rounded-full px-6 py-3 font-bold inline-block animate-fade-in-up">
            🎉 Thank you for subscribing! Check your email for a 10% coupon code.
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full h-12 bg-white border border-outline-variant rounded-full px-6 outline-none text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto flex items-center justify-center gap-2 flex-shrink-0"
              icon={<Send size={16} />}
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
