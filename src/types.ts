import type React from 'react';

// Base interfaces
export interface Product {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly featured?: boolean;
}

export interface MenuCategory {
  readonly name: string;
  readonly description?: string;
  readonly items: readonly Product[];
}

export interface NavLinkItem {
  readonly name: string;
  readonly path: string;
  readonly megaMenuContent?: readonly MenuCategory[];
}

// Component prop types
export interface ComponentWithClassName {
  readonly className?: string;
}

export interface ComponentWithChildren {
  readonly children: React.ReactNode;
}

// Icon component type
export type IconComponent = React.ComponentType<ComponentWithClassName>;

// Service categories as const for type safety
export const SERVICE_CATEGORIES = [
  'Data & AI',
  'Cloud & DevOps',
  'Application Development',
] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export interface Service {
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
  readonly category: ServiceCategory;
}

export interface Pillar {
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
}

export interface Differentiator {
  readonly icon: IconComponent;
  readonly title: string;
  readonly description: string;
}

export interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly isFeatured: boolean;
}

// Solution categories as const
export const SOLUTION_CATEGORIES = ['By Industry', 'By Use Case'] as const;
export type SolutionCategory = (typeof SOLUTION_CATEGORIES)[number];

export interface Solution {
  readonly category: SolutionCategory;
  readonly title: string;
  readonly description: string;
}

// Resource types as const
export const RESOURCE_TYPES = ['Blog', 'Whitepaper', 'Webinar'] as const;
export type ResourceType = (typeof RESOURCE_TYPES)[number];

export interface Resource {
  readonly type: ResourceType;
  readonly title: string;
  readonly description: string;
  readonly link: string;
  readonly publishDate?: string;
  readonly readTime?: string;
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageUrl: string;
  readonly socialLinks?: {
    readonly linkedin?: string;
    readonly twitter?: string;
    readonly github?: string;
  };
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T = unknown> {
  readonly data?: T;
  readonly error?: string;
  readonly status: Status;
}
