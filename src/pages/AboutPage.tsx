import React from 'react';
import { Section } from '../components/common/Section';
import { SectionTitle } from '../components/common/SectionTitle';
import { TEAM } from '../constants';

export const AboutPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="About Us">
            Our Mission & Team
        </SectionTitle>
        <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            We are a team of passionate technologists dedicated to solving complex problems and delivering tangible business value through principled engineering and innovative thinking. Our mission is to empower organizations with the data and AI capabilities needed to thrive in a digital-first world.
        </p>
        <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Meet Our Leadership</h3>
             <div className="mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                 {TEAM.map(member => (
                     <div key={member.name} className="space-y-4 text-center">
                         <img className="mx-auto h-40 w-40 rounded-full" src={member.imageUrl} alt="" />
                         <div className="space-y-2">
                             <h4 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h4>
                             <p className="text-blue-600 dark:text-blue-400">{member.role}</p>
                             <p className="text-gray-500 dark:text-gray-400">{member.bio}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    </Section>
);
