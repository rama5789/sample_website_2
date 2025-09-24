import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';

export const ProductsPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Our Products & Platforms">
            Technology Accelerators
        </SectionTitle>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            We leverage best-in-class technologies and build upon them with our unique frameworks to deliver solutions faster and more reliably.
        </p>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* AWS Product Card */}
            <div className="group relative p-8 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Cloud Solutions on AWS</h3>
                 <p className="mt-2 text-gray-500 dark:text-gray-400">
                     We architect and deploy scalable, serverless, and containerized data solutions on Amazon Web Services. Our expertise spans from foundational data lakes on S3 to real-time analytics with Kinesis and managed machine learning with SageMaker, ensuring you get the most out of the AWS ecosystem.
                 </p>
                 <div className="mt-6">
                    <Link to="#" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold group-hover:underline">Learn more about our AWS practice <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span></Link>
                 </div>
            </div>

            {/* Starburst Product Card */}
            <div className="group relative p-8 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Federated Lakehouse with Starburst</h3>
                 <p className="mt-2 text-gray-500 dark:text-gray-400">
                     Break down data silos without moving data. We implement Starburst Enterprise to create a single point of access to all your data sources—whether in the cloud or on-premise. This federated approach enables fast, interactive analytics across your entire data estate.
                 </p>
                 <div className="mt-6">
                    <Link to="#" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold group-hover:underline">Explore our Lakehouse solutions <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span></Link>
                 </div>
            </div>
        </div>
    </Section>
);