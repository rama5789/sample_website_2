import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../icons';
import { SERVICES } from '../../constants';

export const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <LogoIcon className="h-7 w-7 text-fuchsia-500" />
                        <span>BintyByte</span>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Engineering the future of data and AI.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Solutions</h3>
                            <ul className="mt-4 space-y-4">
                                {SERVICES.map(service => (
                                    <li key={service.title}><Link to="/solutions" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{service.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-4">
                                {[{name:'About', path:'/about'}, {name:'Why Us', path:'/why-us'}, {name:'Resources', path:'/resources'}, {name:'Contact', path:'/contact'}].map(link => (
                                    <li key={link.name}><Link to={link.path} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} BintyByte Technologies Private Limited. All rights reserved.</p>
            </div>
        </div>
    </footer>
);