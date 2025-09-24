import React from 'react';
import type { Service } from '../types';

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/50 transition-all duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-fuchsia-500 text-white group-hover:bg-gradient-to-br from-fuchsia-600 to-blue-600 transition-colors duration-300">
            <service.icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{service.title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{service.description}</p>
    </div>
);