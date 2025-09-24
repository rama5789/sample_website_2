import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { NavLinkItem } from '../../types';

interface MegaMenuProps {
  menu?: NavLinkItem;
  onMouseLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ menu, onMouseLeave }) => {
  if (!menu || !menu.megaMenuContent) return null;

  const [activeCategory, setActiveCategory] = useState(menu.megaMenuContent[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full z-40"
      onMouseLeave={onMouseLeave}
    >
        <div className="absolute inset-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800" aria-hidden="true" />
      
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 py-8">
                <div className="col-span-4">
                    <ul className="space-y-1">
                        {menu.megaMenuContent.map(category => (
                            <li key={category.name}>
                                <button
                                    onMouseEnter={() => setActiveCategory(category)}
                                    className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-150 ${
                                        activeCategory.name === category.name
                                            ? 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-600 dark:text-fuchsia-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="font-semibold">{category.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-span-8">
                    {activeCategory && (
                        <div>
                            {activeCategory.description && (
                                <div className="pb-4 border-b border-gray-200 dark:border-gray-700 mb-4">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{activeCategory.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activeCategory.description}</p>
                                    <Link to="/products" className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline mt-1 inline-block">Browse all products &rarr;</Link>
                                </div>
                            )}
                            
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {activeCategory.items.map(item => (
                                    <li key={item.name}>
                                        <Link to={item.path} className="group block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
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
