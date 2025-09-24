import React from 'react';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { SOLUTIONS } from '../constants';
import { BuildingIcon, HeartPulseIcon, ShoppingCartIcon } from '../components/icons';

export const SolutionsPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Solutions">
            Tailored for Your Needs
        </SectionTitle>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            We apply our deep technical expertise to solve the unique challenges of your industry and use case.
        </p>
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">By Industry</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {SOLUTIONS.filter(s => s.category === 'By Industry').map(solution => (
                     <div key={solution.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                            {solution.title.includes('Finance') ? <BuildingIcon className="h-6 w-6"/> : solution.title.includes('Health') ? <HeartPulseIcon className="h-6 w-6"/> : <ShoppingCartIcon className="h-6 w-6"/>}
                        </div>
                        <h4 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{solution.title}</h4>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{solution.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">By Use Case</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {SOLUTIONS.filter(s => s.category === 'By Use Case').map(solution => (
                     <div key={solution.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                         <h4 className="text-lg font-medium text-gray-900 dark:text-white">{solution.title}</h4>
                         <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{solution.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);
