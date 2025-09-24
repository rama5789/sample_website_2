import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link';
  to: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean
) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 focus:ring-fuchsia-500 shadow-sm',
    secondary:
      'text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500',
    outline:
      'text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500',
    ghost:
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass}`;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary' as ButtonVariant,
  size = 'md' as ButtonSize,
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = `${getButtonClasses(variant, size, fullWidth, disabled)} ${className}`;

  if (props.as === 'link') {
    const { to, onClick } = props;
    return (
      <Link to={to} className={buttonClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { type = 'button', onClick } = props;
  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
