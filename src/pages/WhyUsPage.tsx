import React from 'react';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { DIFFERENTIATORS } from '../constants';

export const WhyUsPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Why QuantumLeap">
            Our Differentiators
        </SectionTitle>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            We are more than just engineers; we are strategic partners invested in your success.
        </p>
        <div className="mt-12 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {DIFFERENTIATORS.map(item => (
                <div key={item.title} className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                            <item.icon className="h-6 w-6" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{item.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                        {item.description}
                    </dd>
                </div>
            ))}
        </div>
    </Section>
);
