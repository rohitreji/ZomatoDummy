import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Lock, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';
import { resetPassword } from '../../api/authApi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(token, { newPassword: password });
      setMessage(res.data.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to reset password. The link might be expired.');
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
          Reset Password
        </h2>
        <p className="text-on-surface-variant text-body-sm text-center mb-8">
          Enter your new password below
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
            label="New Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock size={18} />}
          />

          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            icon={<ShieldCheck size={18} />}
          />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full mt-4 flex items-center justify-center gap-2"
            icon={<ShieldCheck size={18} />}
          >
            Reset Password
          </Button>
        </form>

        <div className="mt-8 text-center text-body-sm text-on-surface-variant font-medium">
          <Link to="/login" className="text-primary font-bold hover:underline select-none">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
