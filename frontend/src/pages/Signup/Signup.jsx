import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isAuthenticated, loading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(name, email, password);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Registration failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 relative overflow-hidden py-12">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl select-none pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl select-none pointer-events-none" />

      {/* Main Glass Panel Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 md:p-10 rounded-[36px] border border-outline-variant/30 shadow-premium relative z-10 flex flex-col items-center"
      >
        {/* Brand Logotype */}
        <div className="flex items-center gap-2 select-none mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-primary text-white p-2.5 rounded-full shadow-md shadow-primary/20 flex items-center justify-center">
            <UtensilsCrossed size={20} />
          </div>
          <span className="font-display text-3xl font-extrabold text-primary tracking-tighter">
            Zomato
          </span>
        </div>

        <h2 className="font-display text-headline-lg font-black text-on-surface text-center mb-1">
          Create Account
        </h2>
        <p className="text-on-surface-variant text-body-sm text-center mb-8">
          Sign up to unlock food delivery features and saves
        </p>

        {error && (
          <div className="w-full bg-error-container text-on-error-container border border-error/20 px-4 py-3 rounded-2xl text-label-sm font-semibold mb-6 animate-fade-in-up">
            ⚠️ {error}
          </div>
        )}

        {/* Signup form details */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            icon={<User size={18} />}
          />

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

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock size={18} />}
          />

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full mt-6 flex items-center justify-center gap-2"
            icon={<UserPlus size={18} />}
          >
            Create Account
          </Button>
        </form>

        {/* Redirect sign in */}
        <div className="mt-8 text-center text-body-sm text-on-surface-variant font-medium">
          <span>Already have an account? </span>
          <Link to="/login" className="text-primary font-bold hover:underline select-none">
            Sign In
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Signup;
