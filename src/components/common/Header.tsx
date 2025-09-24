import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS } from '../../constants';
import { LogoIcon, MenuIcon, XIcon } from '../icons';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme } = useTheme();

    const activeLinkStyle = {
      color: resolvedTheme === 'dark' ? '#60a5fa' : '#3b82f6', // blue-400 dark, blue-500 light
      backgroundImage: `linear-gradient(to top, ${resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'} 100%, transparent 100%)`,
    };

    const navLinkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200";

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <LogoIcon className="h-7 w-7 text-blue-500" />
                        <span>QuantumLeap</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                className={({ isActive }) => `${navLinkClass} ${isActive ? 'active-link' : ''}`}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                            Contact Us
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-left mt-2 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
