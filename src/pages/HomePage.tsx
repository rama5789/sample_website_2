import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { CORE_PILLARS, SERVICES } from '../constants';

export const HomePage: React.FC = () => (
    <>
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20"></div>
            <Section className="relative pt-24 sm:pt-32">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                        <span className="block">Intelligent Data Solutions,</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                            Engineered for Impact
                        </span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
                        We build scalable data platforms, deploy cutting-edge AI, and deliver robust cloud infrastructure to accelerate your business outcomes.
                    </p>
                    <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                        <Link to="/contact" className="px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 sm:px-10">
                            Get Started
                        </Link>
                        <Link to="/why-us" className="px-8 py-3 ml-0 mt-3 sm:mt-0 sm:ml-3 text-base font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/50 dark:hover:bg-blue-900">
                            Learn More
                        </Link>
                    </div>
                </div>
            </Section>
        </div>

        <Section id="pillars">
            <SectionTitle subtitle="Our Approach">
                Core Pillars of Excellence
            </SectionTitle>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {CORE_PILLARS.map(pillar => (
                    <div key={pillar.title} className="text-center">
                        <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-md bg-blue-500 text-white">
                           <pillar.icon className="h-6 w-6"/>
                        </div>
                        <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{pillar.title}</h3>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{pillar.description}</p>
                    </div>
                ))}
            </div>
        </Section>
        
        <Section id="services" className="bg-white dark:bg-gray-900/50">
            <SectionTitle subtitle="What We Do">
                Our Services
            </SectionTitle>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map(service => <ServiceCard key={service.title} service={service} />)}
            </div>
        </Section>

        <Section id="cta">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl">
                <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Ready to unlock your data's potential?
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-100">
                        Let's discuss how QuantumLeap can help you achieve your goals.
                    </p>
                    <Link to="/contact" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto">
                        Schedule a Consultation
                    </Link>
                </div>
            </div>
        </Section>
    </>
);
