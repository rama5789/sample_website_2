import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import type { NavLinkItem, MenuCategory, Product } from '../../types';
import { ChevronRightIcon, XIcon, ArrowLeftIcon } from '../icons';

interface MegaMenuProps {
  menu?: NavLinkItem;
  onClose: () => void;
}

interface MobileNavLevel {
    title: string;
    level: 'categories' | 'products';
    data: MenuCategory[] | MenuCategory;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ menu, onClose }) => {
  if (!menu || !menu.megaMenuContent) return null;

  const [activeCategory, setActiveCategory] = useState(menu.megaMenuContent[0]);
  const [mobileNavStack, setMobileNavStack] = useState<MobileNavLevel[]>([
    { title: 'Products', level: 'categories', data: menu.megaMenuContent }
  ]);
  const [direction, setDirection] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setMobileNavStack([{ title: 'Products', level: 'categories', data: menu.megaMenuContent }]);
  }, [location, menu]);

  const handleMobileCategoryClick = (category: MenuCategory) => {
    setDirection(1);
    setMobileNavStack(stack => [...stack, { title: category.name, level: 'products', data: category }]);
  };

  const handleMobileBack = () => {
    setDirection(-1);
    setMobileNavStack(stack => stack.slice(0, -1));
  };
  
  const currentMobileLevel = mobileNavStack[mobileNavStack.length - 1];
  const motionVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-white dark:bg-gray-900 lg:fixed lg:top-16 lg:left-0 lg:right-0 lg:bottom-auto lg:h-auto lg:bg-white/80 lg:dark:bg-gray-900/80 lg:backdrop-blur-xl lg:shadow-xl lg:border-t lg:border-gray-200 lg:dark:border-gray-800"
    >
      {/* Desktop View */}
      <div className="hidden lg:block container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-8 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Close menu"
          >
              <XIcon className="h-6 w-6" />
          </button>
          <div className="flex max-h-[calc(100vh-12rem)] min-h-[30rem]">
              <div className="w-[280px] flex-shrink-0 overflow-y-auto py-8 pr-4 border-r border-gray-200 dark:border-gray-700">
                  <ul className="space-y-1">
                      {menu.megaMenuContent.map(category => (
                          <li key={category.name}>
                              <button
                                  onMouseEnter={() => setActiveCategory(category)}
                                  className={`w-full flex justify-between items-center text-left px-4 py-2.5 rounded-md transition-colors duration-150 text-sm ${
                                      activeCategory.name === category.name
                                          ? 'bg-gray-800 dark:bg-gray-700 text-white'
                                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                                  }`}
                              >
                                  <span className="font-semibold">{category.name}</span>
                                  {activeCategory.name === category.name && <ChevronRightIcon className="h-5 w-5" />}
                              </button>
                          </li>
                      ))}
                  </ul>
              </div>
              <div className="flex-grow overflow-y-auto py-8 pl-8">
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={activeCategory.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                      >
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
                      </motion.div>
                  </AnimatePresence>
              </div>
          </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col h-full">
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            {mobileNavStack.length > 1 ? (
                <button onClick={handleMobileBack} className="p-2 -ml-2 text-gray-600 dark:text-gray-300">
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
            ) : <div className="w-10"></div> }
            <h2 className="font-bold text-lg text-gray-900 dark:text-white text-center">{currentMobileLevel.title}</h2>
            <button onClick={onClose} className="p-2 -mr-2 text-gray-600 dark:text-gray-300" aria-label="Close menu">
                <XIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="flex-1 overflow-hidden relative">
             <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={mobileNavStack.length}
                    custom={direction}
                    variants={motionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.2 }}
                    className="absolute w-full h-full p-4 space-y-2 overflow-y-auto"
                >
                    {currentMobileLevel.level === 'categories' && (
                        (currentMobileLevel.data as MenuCategory[]).map(category => (
                            <button 
                                key={category.name}
                                onClick={() => handleMobileCategoryClick(category)}
                                className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <span>{category.name}</span>
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        ))
                    )}
                    {currentMobileLevel.level === 'products' && (
                        <>
                            {(currentMobileLevel.data as MenuCategory).description && (
                                <div className="p-4 mb-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{(currentMobileLevel.data as MenuCategory).description}</p>
                                    <Link onClick={onClose} to="/products" className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline mt-1 inline-block">Browse all products &rarr;</Link>
                                </div>
                            )}
                            {(currentMobileLevel.data as MenuCategory).items.map(product => (
                                <Link
                                    key={product.name}
                                    to={product.path}
                                    onClick={onClose}
                                    className="block w-full px-4 py-3 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span className="font-semibold text-gray-800 dark:text-gray-100">{product.name}</span>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">{product.description}</p>
                                </Link>
                            ))}
                        </>
                    )}
                </motion.div>
             </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};