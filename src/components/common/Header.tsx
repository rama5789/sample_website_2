import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import {
  ANIMATION_VARIANTS,
  TRANSITIONS,
  GLASS_EFFECT,
  CONTAINER_CLASSES,
} from '../../constants/styles';
import { LogoIcon, MenuIcon, XIcon, ChevronRightIcon } from '../icons';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { NavLink } from './NavLink';
import { Button } from './Button';
import { useMenuState } from '../../hooks/useMenuState';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { AnimatePresence, motion } from 'motion/react';

const HeaderComponent: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    megaMenuButtonRef,
    megaMenuRef,
  } = useMenuState();

  useBodyScrollLock(isMobileMenuOpen || isMegaMenuOpen);

  const productsLink = NAV_LINKS.find(link => link.name === 'Products');

  return (
    <>
      <header
        className={`sticky top-0 z-50 ${GLASS_EFFECT} border-b border-gray-200 dark:border-gray-800`}
      >
        <div className={CONTAINER_CLASSES}>
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <LogoIcon className="h-7 w-7 text-fuchsia-500" />
              <span>BintyByte</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map(link => {
                if (link.megaMenuContent) {
                  return (
                    <div key={link.name} className="relative">
                      <button
                        ref={megaMenuButtonRef}
                        onClick={() => setIsMegaMenuOpen(prev => !prev)}
                        className={`relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${
                          isMegaMenuOpen ? 'bg-gray-100 dark:bg-gray-700/50' : ''
                        }`}
                      >
                        {link.name}
                        <span
                          className={`inline-block ml-1 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                        >
                          &#x25BE;
                        </span>
                      </button>
                    </div>
                  );
                }
                return (
                  <NavLink key={link.name} to={link.path}>
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex items-center justify-end">
              <div className="hidden lg:flex items-center gap-4">
                <ThemeToggle />
                <Button as="link" to="/contact" size="sm">
                  Contact Us
                </Button>
              </div>
              <div className="lg:hidden flex items-center">
                <ThemeToggle />
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-fuchsia-500"
                  aria-label="Open main menu"
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div ref={megaMenuRef}>
        <AnimatePresence>
          {isMegaMenuOpen && (
            <MegaMenu menu={productsLink} onClose={() => setIsMegaMenuOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={ANIMATION_VARIANTS.fadeIn}
            transition={TRANSITIONS.default}
          >
            <motion.div
              className="absolute inset-0 bg-black/40"
              variants={ANIMATION_VARIANTS.fadeIn}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-screen max-w-md bg-white dark:bg-gray-900 shadow-xl flex flex-col"
              variants={ANIMATION_VARIANTS.slideInFromRight}
              transition={TRANSITIONS.spring}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-600 dark:text-gray-300"
                  aria-label="Close menu"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {NAV_LINKS.map(item => {
                  if (item.megaMenuContent) {
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
                    );
                  }
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-medium rounded-md"
                      activeClassName="bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
              <div className="p-4 border-t dark:border-gray-700">
                <Button
                  as="link"
                  to="/contact"
                  fullWidth
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Header = memo(HeaderComponent);
