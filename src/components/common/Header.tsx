import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { NAV_LINKS } from '../../constants';
import { LogoIcon, MenuIcon, XIcon, ChevronRightIcon, ArrowLeftIcon } from '../icons';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { AnimatePresence, motion } from 'framer-motion';
import type { NavLinkItem, MenuCategory } from '../../types';

interface MobileMenuLevel {
    title: string;
    items: (NavLinkItem | MenuCategory)[];
    type: 'links' | 'categories';
}

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileNavStack, setMobileNavStack] = useState<MobileMenuLevel[]>([{ title: 'Menu', items: NAV_LINKS, type: 'links' }]);
    
    const { resolvedTheme } = useTheme();
    const location = useLocation();

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setMobileNavStack([{ title: 'Menu', items: NAV_LINKS, type: 'links' }]);
        setActiveMenu(null);
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const handleMouseEnter = (menuName: string) => {
        setActiveMenu(menuName);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    const navLinkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200";

    const handleMobileMenuClick = (item: NavLinkItem) => {
        if (item.megaMenuContent) {
            setMobileNavStack(stack => [...stack, { title: item.name, items: item.megaMenuContent!, type: 'categories' }]);
        } else {
            // Regular link, NavLink will handle it. Closing menu is handled by useEffect on location change.
        }
    };
    
    const handleMobileCategoryClick = (category: MenuCategory) => {
        const productLinks = category.items.map(p => ({ name: p.name, path: p.path, description: p.description }));
        setMobileNavStack(stack => [...stack, { title: category.name, items: productLinks as any, type: 'links' }]);
    };


    const mobileMenuVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };

    const currentMenu = mobileNavStack[mobileNavStack.length - 1];

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                            <LogoIcon className="h-7 w-7 text-fuchsia-500" />
                            <span>BintyByte</span>
                        </Link>
                        
                        <nav className="hidden lg:flex items-center space-x-1">
                            {NAV_LINKS.map(link => (
                                <div key={link.name} onMouseEnter={() => link.megaMenuContent && handleMouseEnter(link.name)} onMouseLeave={() => link.megaMenuContent && handleMouseLeave()} className="relative">
                                    <NavLink 
                                        to={link.path}
                                        className={({ isActive }) => `${navLinkClass} ${isActive ? 'bg-gray-100 dark:bg-gray-700/50' : ''}`}
                                    >
                                        {link.name}
                                    </NavLink>
                                </div>
                            ))}
                        </nav>

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

            {/* Desktop Mega Menu */}
            <AnimatePresence>
                {activeMenu && (
                    <MegaMenu
                        menu={NAV_LINKS.find(link => link.name === activeMenu)}
                        onMouseLeave={handleMouseLeave}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{}}
                    >
                        <motion.div className="absolute inset-0 bg-black/40" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} onClick={() => setIsMobileMenuOpen(false)} />
                        
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 flex z-50"
                            variants={mobileMenuVariants}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="relative w-screen max-w-md bg-white dark:bg-gray-900 shadow-xl flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                                    {mobileNavStack.length > 1 && (
                                        <button onClick={() => setMobileNavStack(s => s.slice(0, -1))} className="p-2 -ml-2 text-gray-600 dark:text-gray-300">
                                            <ArrowLeftIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                    <h2 className="font-bold text-lg text-gray-900 dark:text-white flex-grow text-center">{currentMenu.title}</h2>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-600 dark:text-gray-300" aria-label="Close menu">
                                        <XIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={mobileNavStack.length}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.2 }}
                                        className="p-4 space-y-2"
                                    >
                                        {currentMenu.type === 'links' && (currentMenu.items as NavLinkItem[]).map(item => (
                                            <div key={item.name}>
                                                <NavLink 
                                                    to={item.path} 
                                                    onClick={() => handleMobileMenuClick(item)}
                                                    className={({isActive}) => `flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md ${isActive ? 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                                >
                                                    <span>{item.name}</span>
                                                    {item.megaMenuContent && <ChevronRightIcon className="h-5 w-5" />}
                                                </NavLink>
                                            </div>
                                        ))}

                                        {currentMenu.type === 'categories' && (currentMenu.items as MenuCategory[]).map(category => (
                                            <button 
                                                key={category.name}
                                                onClick={() => handleMobileCategoryClick(category)}
                                                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <span>{category.name}</span>
                                                <ChevronRightIcon className="h-5 w-5" />
                                            </button>
                                        ))}

                                    </motion.div>
                                </AnimatePresence>
                                </div>

                                <div className="p-4 border-t dark:border-gray-700">
                                     <Link to="/contact" className="block w-full text-center px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-90 transition-opacity rounded-md">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
