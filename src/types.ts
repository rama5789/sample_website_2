import type React from 'react';

export interface NavLinkItem {
  name: string;
  path: string;
}

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category: 'Data & AI' | 'Cloud & DevOps' | 'Application Development';
}

export interface Pillar {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

export interface Differentiator {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured: boolean;
}

export interface Solution {
    category: 'By Industry' | 'By Use Case';
    title: string;
    description: string;
}

export interface Resource {
    type: 'Blog' | 'Whitepaper' | 'Webinar';
    title: string;
    description: string;
    link: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}
