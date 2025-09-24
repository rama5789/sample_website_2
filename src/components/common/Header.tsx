import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import { LogoIcon, MenuIcon, XIcon, ChevronRightIcon } from '../icons';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { AnimatePresence, motion } from 'framer-motion';
import type { NavLinkItem } from '../../types';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    
    const location = useLocation();
    const megaMenuButtonRef = useRef<HTMLButtonElement>(null);
    const megaMenuRef = useRef<HTMLDivElement>(null);

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen || isMegaMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen, isMegaMenuOpen]);

    // Handle clicks outside of mega menu to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMegaMenuOpen &&
                megaMenuRef.current && 
                !megaMenuRef.current.contains(event.target as Node) &&
                megaMenuButtonRef.current &&
                !megaMenuButtonRef.current.contains(event.target as Node)
            ) {
                setIsMegaMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMegaMenuOpen]);

    const productsLink = NAV_LINKS.find(link => link.name === 'Products');
    const navLinkClass = "relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200";

    const mobileMenuVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    
    const mobilePanelVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                            <LogoIcon className="h-7 w-7 text-fuchsia-500" />
                            <span>BintyByte</span>
                        </Link>
                        
                        <div className="hidden lg:flex items-center space-x-1">
                            {NAV_LINKS.map(link => {
                                if (link.megaMenuContent) {
                                    return (
                                        <div key={link.name} className="relative">
                                            <button 
                                                ref={megaMenuButtonRef}
                                                onClick={() => setIsMegaMenuOpen(prev => !prev)}
                                                className={`${navLinkClass} ${isMegaMenuOpen ? 'bg-gray-100 dark:bg-gray-700/50' : ''}`}
                                            >
                                                {link.name}
                                                <span className={`inline-block ml-1 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}>&#x25BE;</span>
                                            </button>
                                        </div>
                                    )
                                }
                                return (
                                    <NavLink 
                                        key={link.name} 
                                        to={link.path}
                                        className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-100 dark:bg-gray-700/50' : ''}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                )
                            })}
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="hidden lg:flex items-center gap-4">
                                <ThemeToggle />
                                <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 transition-all duration-200 rounded-md shadow-sm">
                                    Contact Us
                                </Link>
                            </div>
                            <div className="lg:hidden flex items-center">
                                <ThemeToggle />
                                <button onClick={() => setIsMobileMenuOpen(true)} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fuchsia-500" aria-label="Open main menu">
                                    <MenuIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Unified Mega Menu for Desktop and Mobile */}
             <div ref={megaMenuRef}>
                <AnimatePresence>
                    {isMegaMenuOpen && (
                        <MegaMenu
                            menu={productsLink}
                            onClose={() => setIsMegaMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Slide-out Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] lg:hidden"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div 
                            className="absolute inset-0 bg-black/40" 
                            variants={mobileMenuVariants} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                        />
                        
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 w-screen max-w-md bg-white dark:bg-gray-900 shadow-xl flex flex-col"
                            variants={mobilePanelVariants}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-600 dark:text-gray-300" aria-label="Close menu">
                                    <XIcon className="h-6 w-6" />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {NAV_LINKS.map(item => {
                                    if(item.megaMenuContent) {
                                        return (
                                            <button 
                                                key={item.name}
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    setIsMegaMenuOpen(true);
                                                }}
                                                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronRightIcon className="h-5 w-5" />
                                            </button>
                                        )
                                    }
                                    return (
                                        <NavLink 
                                            key={item.name}
                                            to={item.path} 
                                            className={({isActive}) => `flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md ${isActive ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                        >
                                            <span>{item.name}</span>
                                        </NavLink>
                                    )
                                })}
                            </div>

                            <div className="p-4 border-t dark:border-gray-700">
                                 <Link to="/contact" className="block w-full text-center px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-90 transition-opacity rounded-md">
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
