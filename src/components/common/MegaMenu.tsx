import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { NavLinkItem } from '../../types';
import { ChevronRightIcon, XIcon } from '../icons';

interface MegaMenuProps {
  menu?: NavLinkItem;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ menu, onClose }) => {
  if (!menu || !menu.megaMenuContent) return null;

  const [activeCategory, setActiveCategory] = useState(menu.megaMenuContent[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full z-40"
    >
        <div className="absolute inset-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800" />
      
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-8 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
                <XIcon className="h-6 w-6" />
            </button>
            <div className="flex max-h-[calc(100vh-12rem)] min-h-[30rem]">
                <div className="w-[280px] flex-shrink-0 overflow-y-auto py-8 pr-4">
                    <ul className="space-y-1">
                        {menu.megaMenuContent.map(category => (
                            <li key={category.name}>
                                <button
                                    onMouseEnter={() => setActiveCategory(category)}
                                    className={`w-full flex justify-between items-center text-left px-4 py-2.5 rounded-md transition-colors duration-150 text-sm ${
                                        activeCategory.name === category.name
                                            ? 'bg-gray-700 dark:bg-gray-800 text-white'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                    }`}
                                >
                                    <span className="font-semibold">{category.name}</span>
                                    {activeCategory.name === category.name && <ChevronRightIcon className="h-5 w-5" />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-grow overflow-y-auto py-8 pl-8 border-l border-gray-200 dark:border-gray-700">
                    {activeCategory && (
                        <div>
                            {activeCategory.description && (
                                <div className="pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{activeCategory.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activeCategory.description}</p>
                                    <Link onClick={onClose} to="/products" className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline mt-1 inline-block">Browse all products &rarr;</Link>
                                </div>
                            )}
                            
                            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                {activeCategory.items.map(item => (
                                    <li key={item.name}>
                                        <Link onClick={onClose} to={item.path} className="group block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">{item.description}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
      </div>
    </motion.div>
  );
};