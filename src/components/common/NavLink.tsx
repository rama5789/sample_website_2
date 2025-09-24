import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  onClick,
}) => {
  const baseClass =
    'relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200';

  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `${baseClass} ${className} ${isActive ? `bg-gray-100 dark:bg-gray-700/50 ${activeClassName}` : ''}`
      }
      onClick={onClick}
    >
      {children}
    </RouterNavLink>
  );
};
