import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { PRICING_TIERS } from '../constants';
import { CheckCircleIcon } from '../components/icons';

export const PricingPage: React.FC = () => (
  <Section>
    <SectionTitle subtitle="Pricing Plans">Partnership Models for Every Scale</SectionTitle>
    <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
      Flexible engagement models designed to align with your project needs and strategic goals.
    </p>
    <div className="mt-12 space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
      {PRICING_TIERS.map(tier => (
        <div
          key={tier.name}
          className={`relative p-8 bg-white dark:bg-gray-800/50 border rounded-2xl shadow-sm flex flex-col ${tier.isFeatured ? 'border-2 border-fuchsia-500' : 'border-gray-200 dark:border-gray-700'}`}
        >
          {tier.isFeatured && (
            <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold tracking-wide text-white uppercase bg-fuchsia-500 rounded-full">
              Most Popular
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
            <p className="mt-4 flex items-baseline text-gray-900 dark:text-white">
              <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
            </p>
            <p className="mt-6 text-gray-500 dark:text-gray-400">{tier.description}</p>
            <ul className="mt-6 space-y-4">
              {tier.features.map(feature => (
                <li key={feature} className="flex space-x-3">
                  <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
                  <span className="text-base text-gray-500 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/contact"
            className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium transition-opacity ${tier.isFeatured ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white hover:opacity-90' : 'bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
          >
            Select Plan
          </Link>
        </div>
      ))}
    </div>
  </Section>
);
