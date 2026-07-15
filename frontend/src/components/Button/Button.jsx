import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  icon = null,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:brightness-110 shadow-md shadow-primary/20',
    secondary: 'bg-surface-container-highest text-on-surface hover:bg-outline-variant/30',
    outline: 'border border-primary/30 text-primary hover:bg-primary/5',
    ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low',
    danger: 'bg-error text-white hover:bg-error/90 shadow-md shadow-error/10',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-label-md',
    md: 'px-6 py-2.5 text-label-lg',
    lg: 'px-8 py-3.5 text-headline-sm',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        <span className="mr-2 flex items-center justify-center">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
