import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { RESOURCES } from '../constants';

export const ResourcesPage: React.FC = () => (
  <Section>
    <SectionTitle subtitle="Resources">Insights from Our Experts</SectionTitle>
    <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
      {RESOURCES.map(resource => (
        <div key={resource.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
                {resource.type}
              </p>
              <Link to={resource.link} className="block mt-2">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {resource.title}
                </p>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {resource.description}
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);
