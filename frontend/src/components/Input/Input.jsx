import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  className = '',
  icon = null,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-label-lg font-bold text-on-surface-variant select-none">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-4 text-on-surface-variant/60 flex items-center pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full h-12 bg-surface-container-low border border-outline-variant rounded-full outline-none transition-all duration-200 text-body-md text-on-surface placeholder:text-on-surface-variant/40
            ${icon ? 'pl-11 pr-5' : 'px-6'} 
            focus:ring-2 focus:ring-primary/20 focus:border-primary
            ${error ? 'border-error focus:ring-error/20 focus:border-error' : ''}
          `}
        />
      </div>
      {error && (
        <span className="text-label-sm text-error font-medium px-2">{error}</span>
      )}
    </div>
  );
};

export default Input;
