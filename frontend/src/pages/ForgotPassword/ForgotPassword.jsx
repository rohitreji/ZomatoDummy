import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, UtensilsCrossed, Send } from 'lucide-react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';
import { forgotPassword } from '../../api/authApi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      setMessage(res.data.message || 'Password reset link sent to your email.');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 relative overflow-hidden py-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl select-none pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl select-none pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 md:p-10 rounded-[36px] border border-outline-variant/30 shadow-premium relative z-10 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 select-none mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary text-white p-2.5 rounded-full shadow-md shadow-primary/20 flex items-center justify-center">
            <UtensilsCrossed size={20} />
          </div>
          <span className="font-display text-3xl font-extrabold text-primary tracking-tighter">
            Zomato
          </span>
        </div>

        <h2 className="font-display text-headline-lg font-black text-on-surface text-center mb-1">
          Forgot Password
        </h2>
        <p className="text-on-surface-variant text-body-sm text-center mb-8">
          Enter your email to receive a password reset link
        </p>

        {error && (
          <div className="w-full bg-error-container text-on-error-container border border-error/20 px-4 py-3 rounded-2xl text-label-sm font-semibold mb-6 animate-fade-in-up">
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className="w-full bg-primary/10 text-primary border border-primary/20 px-4 py-3 rounded-2xl text-label-sm font-semibold mb-6 animate-fade-in-up">
            ✓ {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail size={18} />}
          />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full mt-4 flex items-center justify-center gap-2"
            icon={<Send size={18} />}
          >
            Send Reset Link
          </Button>
        </form>

        <div className="mt-8 text-center text-body-sm text-on-surface-variant font-medium">
          <span>Remember your password? </span>
          <Link to="/login" className="text-primary font-bold hover:underline select-none">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
