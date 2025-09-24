
import React, { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import type { NavLinkItem, Service, Pillar, Differentiator, PricingTier, Solution, Resource, TeamMember } from './types';

// THEME MANAGEMENT
// =================================================================================

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
      try {
        return (localStorage.getItem('theme') as Theme) || 'system';
      } catch (e) {
        return 'system';
      }
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const applyTheme = (t: Theme) => {
      let currentTheme: 'light' | 'dark';
      if (t === 'system') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        currentTheme = t;
      }
      
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
      setResolvedTheme(currentTheme);
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme(theme);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
        localStorage.setItem('theme', newTheme);
    } catch(e) { /* Fails silently if localStorage is not available */ }
    setThemeState(newTheme);
  };

  const value = useMemo(() => ({ theme, setTheme, resolvedTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ICONS
// =================================================================================

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const SunIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 17.66 1.41-1.41"/><path d="m17.66 4.93 1.41-1.41"/></svg> );
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> );
const MonitorIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> );
const MenuIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg> );
const XIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> );
const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg> );
const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.993.129"/><path d="M12 5a3 3 0 1 0 5.993.129"/><path d="M15 13a3 3 0 1 0-5.993.129"/><path d="M15 13a3 3 0 1 0 5.993.129"/><path d="M9 13a3 3 0 1 0-5.993.129"/><path d="M9 13a3 3 0 1 0 5.993.129"/><path d="M12 19a3 3 0 1 0-5.993.129"/><path d="M12 19a3 3 0 1 0 5.993.129"/><path d="M13.2 6.51A3 3 0 0 0 12 5a3 3 0 0 0-1.2.49"/><path d="M20.993 14.129A3 3 0 0 0 15 13a3 3 0 0 0-2.348.98"/><path d="m9.652 13.98A3 3 0 0 1 12 13a3 3 0 0 1 2.348.98"/><path d="M3.007 14.129A3 3 0 0 1 9 13a3 3 0 0 1-1.2.49"/><path d="m4.207 7.51-.01.001A3 3 0 0 1 9 5a3 3 0 0 1 1.2.49"/><path d="M19.793 7.51A3 3 0 0 0 15 5a3 3 0 0 0-1.2.49"/><path d="m4.207 16.49.01-.001A3 3 0 0 0 9 19a3 3 0 0 0 1.2-.49"/><path d="m19.793 16.49A3 3 0 0 1 15 19a3 3 0 0 1-1.2-.49"/></svg> );
const LayersIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> );
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> );
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg> );
const CloudCogIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><circle cx="12" cy="17" r="3"/><path d="M12 13v1"/><path d="M12 20v1"/><path d="m14.6 14.6.7.7"/><path d="m8.7 18.7.7.7"/><path d="M15 17h-1"/><path d="M9 17H8"/><path d="m14.6 19.4-.7-.7"/><path d="m8.7 15.3-.7-.7"/></svg> );
const CodeIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> );
const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="8" x2="8" y1="6" y2="18"/><line x1="16" x2="16" y1="6" y2="18"/><line x1="12" x2="12" y1="6" y2="18"/></svg> );
const HeartPulseIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1 2.1 4.4 3.2-7.4-1.2 2.4H22"/></svg> );
const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg> );

// DATA & CONTENT
// =================================================================================

const NAV_LINKS: NavLinkItem[] = [
  { name: 'Why Us', path: '/why-us' },
  { name: 'Products', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
];

const CORE_PILLARS: Pillar[] = [
    { icon: LayersIcon, title: 'Unified Data Platforms', description: 'We architect and build scalable data platforms that unify disparate data sources, providing a single source of truth for your entire organization.' },
    { icon: BrainCircuitIcon, title: 'Intelligent AI Solutions', description: 'From predictive analytics to generative AI agents, we develop intelligent systems that automate processes, uncover insights, and create new value.' },
    { icon: CloudCogIcon, title: 'Modern Cloud Engineering', description: 'Leveraging the best of AWS, GCP, and Azure, we deliver resilient, cost-effective, and secure cloud infrastructure tailored to your business needs.' },
];

const SERVICES: Service[] = [
  { icon: DatabaseIcon, title: 'Data Engineering', description: 'Design and implementation of robust big data, real-time, and batch data pipelines.', category: 'Data & AI' },
  { icon: BrainCircuitIcon, title: 'Data Science & AI', description: 'Harnessing traditional ML, agentic AI, and GenAI to build powerful, predictive AI pipelines.', category: 'Data & AI' },
  { icon: LayersIcon, title: 'Data Analytics', description: 'Enabling insightful decisions with real-time and batch analytics dashboards and reporting.', category: 'Data & AI' },
  { icon: CloudCogIcon, title: 'Cloud Infrastructure', description: 'Expert architecture and management on AWS, GCP, and Azure for scalable and secure operations.', category: 'Cloud & DevOps' },
  { icon: CodeIcon, title: 'Application Development', description: 'Building high-performance applications with React, NodeJS, SpringBoot, and mobile technologies.', category: 'Application Development' },
  { icon: CheckCircleIcon, title: 'DevSecOps', description: 'Automating and securing your software lifecycle with Jenkins, Kubernetes, and Terraform.', category: 'Cloud & DevOps' },
];

const DIFFERENTIATORS: Differentiator[] = [
    { icon: CheckCircleIcon, title: 'Business-Outcome Driven', description: 'We start with your desired business outcomes and engineer technology solutions that directly support those goals, ensuring a clear ROI.' },
    { icon: BrainCircuitIcon, title: 'AI-Native Approach', description: 'Our teams are fluent in the latest AI and ML technologies, embedding intelligence into every layer of the solutions we build, from infrastructure to user experience.' },
    { icon: LayersIcon, title: 'Multi-Cloud & Hybrid Expertise', description: 'We provide unbiased, expert guidance across AWS, GCP, Azure, and on-premise environments to build the best-fit architecture for your specific needs, avoiding vendor lock-in.' },
    { icon: CodeIcon, title: 'Full-Stack Capability', description: 'From foundational data pipelines and cloud infrastructure to polished frontend applications, our integrated teams can own and deliver your entire technology stack.' },
];

const PRICING_TIERS: PricingTier[] = [
  { name: 'Starter', price: 'Contact Us', description: 'For teams getting started with a single, well-defined project.', features: ['1 Project Scope', 'Dedicated Project Manager', 'Bi-weekly Reporting', 'Standard Support'], isFeatured: false },
  { name: 'Professional', price: 'Contact Us', description: 'For businesses looking for a long-term strategic technology partner.', features: ['Multiple Concurrent Projects', 'Dedicated Technical Architect', 'Weekly Strategy Sessions', 'Priority Support (24hr SLA)'], isFeatured: true },
  { name: 'Enterprise', price: 'Contact Us', description: 'For large organizations requiring comprehensive, on-demand expertise.', features: ['Full Team Integration', 'On-demand Staff Augmentation', 'Custom SLA & On-site Options', 'Executive-level Reporting'], isFeatured: false },
];

const SOLUTIONS: Solution[] = [
    { category: 'By Industry', title: 'Financial Services', description: 'Real-time fraud detection, algorithmic trading infrastructure, and regulatory compliance reporting platforms.' },
    { category: 'By Industry', title: 'Healthcare', description: 'Personalized patient outcome prediction, secure clinical data lakes, and operational efficiency analytics.' },
    { category: 'By Industry', title: 'Retail & E-commerce', description: 'Hyper-personalized recommendation engines, supply chain optimization, and customer lifetime value modeling.' },
    { category: 'By Use Case', title: 'Real-time Analytics', description: 'Building streaming data pipelines with technologies like Kafka and Flink for immediate insights.' },
    { category: 'By Use Case', title: 'MLOps & AI Pipelines', description: 'End-to-end automation of machine learning model training, deployment, and monitoring for reliable AI.' },
    { category: 'By Use Case', title: 'Generative AI Applications', description: 'Developing custom chatbots, content generation tools, and agentic workflows using the latest foundation models.' },
];

const RESOURCES: Resource[] = [
    { type: 'Blog', title: 'The Modern Data Lakehouse: A Pragmatic Guide', description: 'Explore the architectural patterns combining the best of data lakes and data warehouses.', link: '#/resources' },
    { type: 'Whitepaper', title: 'Scaling AI: From Prototype to Production', description: 'A deep dive into the MLOps practices required to operationalize machine learning effectively.', link: '#/resources' },
    { type: 'Webinar', title: 'Serverless Data Pipelines on AWS', description: 'Watch our on-demand webinar on building cost-effective, event-driven data processing systems.', link: '#/resources' },
];

const TEAM: TeamMember[] = [
    { name: 'Dr. Evelyn Reed', role: 'Founder & CEO', bio: 'With a PhD in Distributed Systems, Evelyn founded QuantumLeap to bridge the gap between cutting-edge research and practical business application.', imageUrl: 'https://picsum.photos/seed/evelyn/400/400' },
    { name: 'Ben Carter', role: 'Head of Engineering', bio: 'A cloud-native evangelist, Ben leads our engineering teams with a focus on elegant architecture and operational excellence across all major cloud platforms.', imageUrl: 'https://picsum.photos/seed/ben/400/400' },
    { name: 'Priya Singh', role: 'Head of Data Science', bio: 'Priya is a leader in applied AI, specializing in natural language processing and reinforcement learning to solve complex commercial challenges.', imageUrl: 'https://picsum.photos/seed/priya/400/400' },
];


// REUSABLE COMPONENTS
// =================================================================================

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    
    const options = [
      { value: 'light', icon: SunIcon },
      { value: 'dark', icon: MoonIcon },
      { value: 'system', icon: MonitorIcon },
    ] as const;

    return (
        <div className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`p-1.5 rounded-full transition-colors duration-200 ${
                        theme === opt.value
                            ? 'bg-white dark:bg-gray-900 text-blue-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                    aria-label={`Set theme to ${opt.value}`}
                >
                    <opt.icon className="h-5 w-5" />
                </button>
            ))}
        </div>
    );
};

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { resolvedTheme } = useTheme();

    const activeLinkStyle = {
      color: resolvedTheme === 'dark' ? '#60a5fa' : '#3b82f6', // blue-400 dark, blue-500 light
      backgroundImage: `linear-gradient(to top, ${resolvedTheme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.1)'} 100%, transparent 100%)`,
    };

    const navLinkClass = "px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200";

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <LogoIcon className="h-7 w-7 text-blue-500" />
                        <span>QuantumLeap</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-4">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                className={({ isActive }) => `${navLinkClass} ${isActive ? 'active-link' : ''}`}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/contact" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                            Contact Us
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_LINKS.map(link => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-left mt-2 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        <LogoIcon className="h-7 w-7 text-blue-500" />
                        <span>QuantumLeap</span>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Engineering the future of data and AI.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Solutions</h3>
                            <ul className="mt-4 space-y-4">
                                {SERVICES.map(service => (
                                    <li key={service.title}><Link to="/solutions" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{service.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-4">
                                {[{name:'About', path:'/about'}, {name:'Why Us', path:'/why-us'}, {name:'Resources', path:'/resources'}, {name:'Contact', path:'/contact'}].map(link => (
                                    <li key={link.name}><Link to={link.path} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">{link.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} QuantumLeap Engineering. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const Section: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
);

const SectionTitle: React.FC<{ subtitle: string, children: React.ReactNode }> = ({ subtitle, children }) => (
    <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">{subtitle}</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {children}
        </p>
    </div>
);

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="group p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white group-hover:bg-gradient-to-br from-blue-500 to-indigo-600 transition-colors duration-300">
            <service.icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{service.title}</h3>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{service.description}</p>
    </div>
);

// PAGE COMPONENTS
// =================================================================================

const HomePage: React.FC = () => (
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

const WhyUsPage: React.FC = () => (
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

const ProductsPage: React.FC = () => (
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
                    <Link to="#" className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">Learn more about our AWS practice <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span></Link>
                 </div>
            </div>

            {/* Starburst Product Card */}
            <div className="group relative p-8 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Federated Lakehouse with Starburst</h3>
                 <p className="mt-2 text-gray-500 dark:text-gray-400">
                     Break down data silos without moving data. We implement Starburst Enterprise to create a single point of access to all your data sources—whether in the cloud or on-premise. This federated approach enables fast, interactive analytics across your entire data estate.
                 </p>
                 <div className="mt-6">
                    <Link to="#" className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">Explore our Lakehouse solutions <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span></Link>
                 </div>
            </div>
        </div>
    </Section>
);


const SolutionsPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Solutions">
            Tailored for Your Needs
        </SectionTitle>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            We apply our deep technical expertise to solve the unique challenges of your industry and use case.
        </p>
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">By Industry</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {SOLUTIONS.filter(s => s.category === 'By Industry').map(solution => (
                     <div key={solution.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                            {solution.title.includes('Finance') ? <BuildingIcon className="h-6 w-6"/> : solution.title.includes('Health') ? <HeartPulseIcon className="h-6 w-6"/> : <ShoppingCartIcon className="h-6 w-6"/>}
                        </div>
                        <h4 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">{solution.title}</h4>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{solution.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">By Use Case</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {SOLUTIONS.filter(s => s.category === 'By Use Case').map(solution => (
                     <div key={solution.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                         <h4 className="text-lg font-medium text-gray-900 dark:text-white">{solution.title}</h4>
                         <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{solution.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const PricingPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Pricing Plans">
            Partnership Models for Every Scale
        </SectionTitle>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            Flexible engagement models designed to align with your project needs and strategic goals.
        </p>
        <div className="mt-12 space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {PRICING_TIERS.map(tier => (
                <div key={tier.name} className={`relative p-8 bg-white dark:bg-gray-800/50 border rounded-2xl shadow-sm flex flex-col ${tier.isFeatured ? 'border-2 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
                    {tier.isFeatured && <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm font-semibold tracking-wide text-white uppercase bg-blue-500 rounded-full">Most Popular</div>}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
                        <p className="mt-4 flex items-baseline text-gray-900 dark:text-white">
                            <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                        </p>
                        <p className="mt-6 text-gray-500 dark:text-gray-400">{tier.description}</p>
                        <ul role="list" className="mt-6 space-y-4">
                            {tier.features.map(feature => (
                                <li key={feature} className="flex space-x-3">
                                    <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500" />
                                    <span className="text-base text-gray-500 dark:text-gray-400">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/contact" className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${tier.isFeatured ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}>
                        Select Plan
                    </Link>
                </div>
            ))}
        </div>
    </Section>
);

const ResourcesPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Resources">
            Insights from Our Experts
        </SectionTitle>
        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            {RESOURCES.map(resource => (
                <div key={resource.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-1 bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
                        <div className="flex-1">
                             <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{resource.type}</p>
                             <Link to={resource.link} className="block mt-2">
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{resource.title}</p>
                                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">{resource.description}</p>
                             </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </Section>
);

const AboutPage: React.FC = () => (
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

const ContactPage: React.FC = () => (
    <Section>
        <SectionTitle subtitle="Contact Us">
            Let's Build Together
        </SectionTitle>
        <div className="mt-12 max-w-lg mx-auto">
            <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                <div>
                    <label htmlFor="full-name" className="sr-only">Full name</label>
                    <input type="text" name="full-name" id="full-name" autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" placeholder="Full name" />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" placeholder="Email" />
                </div>
                 <div>
                    <label htmlFor="company" className="sr-only">Company</label>
                    <input type="text" name="company" id="company" autoComplete="organization" className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" placeholder="Company" />
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea id="message" name="message" rows={4} className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" placeholder="Message"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </Section>
);

// MAIN APP LAYOUT
// =================================================================================

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/why-us" element={<WhyUsPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/solutions" element={<SolutionsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
