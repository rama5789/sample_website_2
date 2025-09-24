import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { SEO } from '../components/common/SEO';
import { CORE_PILLARS, SERVICES } from '../constants';

export const HomePage: React.FC = () => (
  <>
    <SEO
      title="Home"
      description="Transform your business with BintyByte's cutting-edge data engineering, AI solutions, and cloud infrastructure. Expert consulting for modern enterprises seeking intelligent data solutions."
      keywords="data engineering, AI solutions, cloud infrastructure, business intelligence, machine learning, data analytics, digital transformation"
    />
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/30"></div>
      <Section className="relative pt-24 sm:pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            <span className="block">Intelligent Data Solutions,</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500">
              Engineered for Impact
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl">
            We build scalable data platforms, deploy cutting-edge AI, and deliver robust cloud
            infrastructure to accelerate your business outcomes.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 border border-transparent rounded-md shadow-sm hover:opacity-90 transition-opacity sm:px-10"
            >
              Get Started
            </Link>
            <Link
              to="/why-us"
              className="px-8 py-3 ml-0 mt-3 sm:mt-0 sm:ml-3 text-base font-medium text-fuchsia-700 bg-fuchsia-100 border border-transparent rounded-md hover:bg-fuchsia-200 dark:text-fuchsia-300 dark:bg-fuchsia-900/50 dark:hover:bg-fuchsia-900"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Section>
    </div>

    <Section id="pillars">
      <SectionTitle subtitle="Our Approach">Core Pillars of Excellence</SectionTitle>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {CORE_PILLARS.map(pillar => (
          <div key={pillar.title} className="text-center">
            <div className="flex items-center justify-center mx-auto h-12 w-12 rounded-md bg-fuchsia-500 text-white">
              <pillar.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{pillar.description}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section id="services" className="bg-white dark:bg-gray-900/50">
      <SectionTitle subtitle="What We Do">Our Services</SectionTitle>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(service => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </Section>

    <Section id="cta">
      <div className="bg-gradient-to-r from-fuchsia-600 via-purple-700 to-blue-700 rounded-2xl shadow-xl">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to unlock your data&apos;s potential?
          </h2>
          <p className="mt-4 text-lg leading-6 text-fuchsia-100">
            Let&apos;s discuss how BintyByte can help you achieve your goals.
          </p>
          <Link
            to="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-fuchsia-600 bg-white hover:bg-fuchsia-50 sm:w-auto"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </Section>
  </>
);
