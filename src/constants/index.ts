import type { NavLinkItem, Service, Pillar, Differentiator, PricingTier, Solution, Resource, TeamMember, MenuCategory } from '../types';
import {
    LayersIcon,
    BrainCircuitIcon,
    CloudCogIcon,
    DatabaseIcon,
    CodeIcon,
    CheckCircleIcon,
} from '../components/icons';

const PRODUCTS_MENU_CONTENT: MenuCategory[] = [
    {
        name: 'Featured Products',
        description: 'Get started with one of these featured services or browse all products',
        items: [
            { name: 'BintyByte Q', description: 'Generative AI assistant for productivity and insights', path: '/products/q' },
            { name: 'Transform', description: 'Agentic AI to accelerate modernization of .NET, mainframe, and VMWare workloads', path: '/products/transform' },
            { name: 'Aurora', description: 'Serverless relational database service for PostgreSQL, MySQL, and DSQL', path: '/products/aurora' },
            { name: 'AI Bedrock', description: 'Managed service for building and scaling generative AI apps with foundation models', path: '/products/bedrock' },
            { name: 'AI Connect', description: 'AI-native omnichannel cloud contact center', path: '/products/connect' },
            { name: 'EC2', description: 'Secure and resizable compute capacity for virtually any workload', path: '/products/ec2' },
            { name: 'Nova', description: 'Foundation models delivering frontier intelligence and top price performance', path: '/products/nova' },
            { name: 'SageMaker', description: 'The center for all your data, analytics, and AI', path: '/products/sagemaker' },
            { name: 'S3', description: 'Virtually unlimited secure object storage for AI, analytics, and archives', path: '/products/s3' },
        ],
    },
    {
        name: 'Analytics',
        items: [
            { name: 'DataBrew', description: 'Visual data preparation tool', path: '/products/analytics/databrew' },
            { name: 'BintyByte Warehouse', description: 'Cloud data warehouse', path: '/products/analytics/warehouse' },
            { name: 'QuickSight', description: 'Business intelligence (BI) service', path: '/products/analytics/quicksight' },
            { name: 'Kinesis', description: 'Real-time data streaming', path: '/products/analytics/kinesis' },
        ],
    },
    {
        name: 'Application Integration',
        items: [
            { name: 'EventBridge', description: 'Serverless event bus for SaaS and custom applications', path: '/products/integration/eventbridge' },
            { name: 'Step Functions', description: 'Visual workflows for distributed applications', path: '/products/integration/step-functions' },
            { name: 'SQS', description: 'Fully managed message queuing service', path: '/products/integration/sqs' },
            { name: 'SNS', description: 'Pub/sub, SMS, email, and mobile push notifications', path: '/products/integration/sns' },
        ],
    },
    {
        name: 'Artificial Intelligence',
        items: [
            { name: 'AI Bedrock', description: 'Build with foundation models', path: '/products/ai/bedrock' },
            { name: 'Lex', description: 'Conversational AI for chatbots', path: '/products/ai/lex' },
            { name: 'Polly', description: 'Text-to-speech service', path: '/products/ai/polly' },
            { name: 'Rekognition', description: 'Automate your image and video analysis', path: '/products/ai/rekognition' },
        ],
    },
     {
        name: 'Business Applications',
        items: [
            { name: 'WorkDocs', description: 'Secure content collaboration and file storage', path: '/products/bizapps/workdocs' },
            { name: 'Chime', description: 'Frustration-free meetings, video calls, and chat', path: '/products/bizapps/chime' },
        ],
    },
    {
        name: 'Compute',
        items: [
            { name: 'EC2', description: 'Virtual servers in the cloud', path: '/products/compute/ec2' },
            { name: 'Lambda', description: 'Run code without thinking about servers', path: '/products/compute/lambda' },
            { name: 'Lightsail', description: 'Easy-to-use cloud platform', path: '/products/compute/lightsail' },
            { name: 'EKS', description: 'The most trusted way to start, run, and scale Kubernetes', path: '/products/compute/eks' },
        ],
    },
    {
        name: 'Databases',
        items: [
            { name: 'Aurora', description: 'Managed relational database service', path: '/products/db/aurora' },
            { name: 'DynamoDB', description: 'NoSQL database service', path: '/products/db/dynamodb' },
            { name: 'ElastiCache', description: 'In-memory caching service', path: '/products/db/elasticache' },
            { name: 'RDS', description: 'Managed relational database service for popular engines', path: '/products/db/rds' },
        ],
    },
    {
        name: 'Developer Tools',
        items: [
            { name: 'Cloud9', description: 'Cloud-based IDE for writing, running, and debugging code', path: '/products/devtools/cloud9' },
            { name: 'CodeCommit', description: 'Securely host highly scalable private Git repositories', path: '/products/devtools/codecommit' },
            { name: 'CodeDeploy', description: 'Automate code deployments to any instance', path: '/products/devtools/codedeploy' },
        ],
    },
];


export const NAV_LINKS: NavLinkItem[] = [
  { name: 'Why Us', path: '/why-us' },
  { name: 'Products', path: '/products', megaMenuContent: PRODUCTS_MENU_CONTENT },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
];

export const CORE_PILLARS: Pillar[] = [
    { icon: LayersIcon, title: 'Unified Data Platforms', description: 'We architect and build scalable data platforms that unify disparate data sources, providing a single source of truth for your entire organization.' },
    { icon: BrainCircuitIcon, title: 'Intelligent AI Solutions', description: 'From predictive analytics to generative AI agents, we develop intelligent systems that automate processes, uncover insights, and create new value.' },
    { icon: CloudCogIcon, title: 'Modern Cloud Engineering', description: 'Leveraging the best of AWS, GCP, and Azure, we deliver resilient, cost-effective, and secure cloud infrastructure tailored to your business needs.' },
];

export const SERVICES: Service[] = [
  { icon: DatabaseIcon, title: 'Data Engineering', description: 'Design and implementation of robust big data, real-time, and batch data pipelines.', category: 'Data & AI' },
  { icon: BrainCircuitIcon, title: 'Data Science & AI', description: 'Harnessing traditional ML, agentic AI, and GenAI to build powerful, predictive AI pipelines.', category: 'Data & AI' },
  { icon: LayersIcon, title: 'Data Analytics', description: 'Enabling insightful decisions with real-time and batch analytics dashboards and reporting.', category: 'Data & AI' },
  { icon: CloudCogIcon, title: 'Cloud Infrastructure', description: 'Expert architecture and management on AWS, GCP, and Azure for scalable and secure operations.', category: 'Cloud & DevOps' },
  { icon: CodeIcon, title: 'Application Development', description: 'Building high-performance applications with React, NodeJS, SpringBoot, and mobile technologies.', category: 'Application Development' },
  { icon: CheckCircleIcon, title: 'DevSecOps', description: 'Automating and securing your software lifecycle with Jenkins, Kubernetes, and Terraform.', category: 'Cloud & DevOps' },
];

export const DIFFERENTIATORS: Differentiator[] = [
    { icon: CheckCircleIcon, title: 'Business-Outcome Driven', description: 'We start with your desired business outcomes and engineer technology solutions that directly support those goals, ensuring a clear ROI.' },
    { icon: BrainCircuitIcon, title: 'AI-Native Approach', description: 'Our teams are fluent in the latest AI and ML technologies, embedding intelligence into every layer of the solutions we build, from infrastructure to user experience.' },
    { icon: LayersIcon, title: 'Multi-Cloud & Hybrid Expertise', description: 'We provide unbiased, expert guidance across AWS, GCP, Azure, and on-premise environments to build the best-fit architecture for your specific needs, avoiding vendor lock-in.' },
    { icon: CodeIcon, title: 'Full-Stack Capability', description: 'From foundational data pipelines and cloud infrastructure to polished frontend applications, our integrated teams can own and deliver your entire technology stack.' },
];

export const PRICING_TIERS: PricingTier[] = [
  { name: 'Starter', price: 'Contact Us', description: 'For teams getting started with a single, well-defined project.', features: ['1 Project Scope', 'Dedicated Project Manager', 'Bi-weekly Reporting', 'Standard Support'], isFeatured: false },
  { name: 'Professional', price: 'Contact Us', description: 'For businesses looking for a long-term strategic technology partner.', features: ['Multiple Concurrent Projects', 'Dedicated Technical Architect', 'Weekly Strategy Sessions', 'Priority Support (24hr SLA)'], isFeatured: true },
  { name: 'Enterprise', price: 'Contact Us', description: 'For large organizations requiring comprehensive, on-demand expertise.', features: ['Full Team Integration', 'On-demand Staff Augmentation', 'Custom SLA & On-site Options', 'Executive-level Reporting'], isFeatured: false },
];

export const SOLUTIONS: Solution[] = [
    { category: 'By Industry', title: 'Financial Services', description: 'Real-time fraud detection, algorithmic trading infrastructure, and regulatory compliance reporting platforms.' },
    { category: 'By Industry', title: 'Healthcare', description: 'Personalized patient outcome prediction, secure clinical data lakes, and operational efficiency analytics.' },
    { category: 'By Industry', title: 'Retail & E-commerce', description: 'Hyper-personalized recommendation engines, supply chain optimization, and customer lifetime value modeling.' },
    { category: 'By Use Case', title: 'Real-time Analytics', description: 'Building streaming data pipelines with technologies like Kafka and Flink for immediate insights.' },
    { category: 'By Use Case', title: 'MLOps & AI Pipelines', description: 'End-to-end automation of machine learning model training, deployment, and monitoring for reliable AI.' },
    { category: 'By Use Case', title: 'Generative AI Applications', description: 'Developing custom chatbots, content generation tools, and agentic workflows using the latest foundation models.' },
];

export const RESOURCES: Resource[] = [
    { type: 'Blog', title: 'The Modern Data Lakehouse: A Pragmatic Guide', description: 'Explore the architectural patterns combining the best of data lakes and data warehouses.', link: '#/resources' },
    { type: 'Whitepaper', title: 'Scaling AI: From Prototype to Production', description: 'A deep dive into the MLOps practices required to operationalize machine learning effectively.', link: '#/resources' },
    { type: 'Webinar', title: 'Serverless Data Pipelines on AWS', description: 'Watch our on-demand webinar on building cost-effective, event-driven data processing systems.', link: '#/resources' },
];

export const TEAM: TeamMember[] = [
    { name: 'Dr. Evelyn Reed', role: 'Founder & CEO', bio: 'With a PhD in Distributed Systems, Evelyn founded BintyByte to bridge the gap between cutting-edge research and practical business application.', imageUrl: 'https://picsum.photos/seed/evelyn/400/400' },
    { name: 'Ben Carter', role: 'Head of Engineering', bio: 'A cloud-native evangelist, Ben leads our engineering teams with a focus on elegant architecture and operational excellence across all major cloud platforms.', imageUrl: 'https://picsum.photos/seed/ben/400/400' },
    { name: 'Priya Singh', role: 'Head of Data Science', bio: 'Priya is a leader in applied AI, specializing in natural language processing and reinforcement learning to solve complex commercial challenges.', imageUrl: 'https://picsum.photos/seed/priya/400/400' },
];