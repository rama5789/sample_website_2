import React from 'react';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';

export const ContactPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Contact Us">
            Let's Build Together
        </SectionTitle>
        <div className="mt-12 max-w-lg mx-auto">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                <div>
                    <label htmlFor="full-name" className="sr-only">Full name</label>
                    <input type="text" name="full-name" id="full-name" autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-fuchsia-500 focus:border-fuchsia-500 border-gray-300 rounded-md" placeholder="Full name" />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-fuchsia-500 focus:border-fuchsia-500 border-gray-300 rounded-md" placeholder="Email" />
                </div>
                 <div>
                    <label htmlFor="company" className="sr-only">Company</label>
                    <input type="text" name="company" id="company" autoComplete="organization" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-fuchsia-500 focus:border-fuchsia-500 border-gray-300 rounded-md" placeholder="Company" />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea id="message" name="message" rows={4} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-fuchsia-500 focus:border-fuchsia-500 border-gray-300 rounded-md" placeholder="Message"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </Section>
);