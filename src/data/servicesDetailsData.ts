export interface ServiceDetailsContent {
  id: string;
  description: string;
  whyChoose: string;
  process: string[];
  features: string[];
  relatedServices: string[];
}

export const servicesDetailsData: ServiceDetailsContent[] = [
  // Branding & Identity Design
  {
    id: 'logo-design',
    description: 'Elevate your brand with a timeless, minimalist logo design that speaks volumes. Our "Professional Minimalist Logo Design" package is crafted for businesses that value sophistication and clarity. We don\'t just design logos; we create visual identities that resonate with your target audience and stand the test of time.',
    whyChoose: 'Why choose minimalist? Minimalist designs are memorable, scalable, and versatile across all mediums—from mobile screens to large billboards. Our professional logo design service includes comprehensive brand identity elements.',
    process: [
      'Discovery: We analyze your brand values, mission, and target market.',
      'Concept: Our designers sketch multiple concepts tailored to your brief.',
      'Refinement: We refine the chosen concept to perfection, focusing on geometry and balance.',
      'Delivery: You receive all industry-standard files ready for print and digital use.'
    ],
    features: [
      '2 Unique Logo Concepts',
      'Vector Source Files (AI, EPS, SVG)',
      'High-Res Transparent PNGs',
      '3D Mockup Presentation',
      'Social Media Kit (Profile & Covers)',
      'Brand Color Palette',
      'Typography Recommendations'
    ],
    relatedServices: ['business-card-design', 'brand-guidelines', 'packaging-design']
  },
  {
    id: 'business-card-design',
    description: 'Make a lasting first impression with professionally designed business cards that reflect your brand\'s personality. Our business card design service combines creativity with practicality to create cards that are both beautiful and functional.',
    whyChoose: 'Why choose professional business card design? Your business card is often the first tangible representation of your brand that clients will see and keep.',
    process: [
      'Brand Analysis: Understanding your brand identity and requirements.',
      'Design Concepts: Creating multiple layout options.',
      'Client Feedback: Iterating based on your preferences.',
      'Final Production: Preparing print-ready files.'
    ],
    features: [
      '3 Design Concepts',
      'Print-Ready Files',
      'Bleed and Safe Zone Setup',
      'Color Proofing',
      'QR Code Integration',
      'Contact Information Optimization'
    ],
    relatedServices: ['logo-design', 'letterhead-design', 'brand-guidelines']
  },
  {
    id: 'brand-guidelines',
    description: 'Establish brand consistency across all touchpoints with comprehensive brand guidelines. Our brand guidelines creation service ensures your brand maintains a cohesive identity across all marketing materials and communications.',
    whyChoose: 'Why choose professional brand guidelines? Consistent branding builds trust and recognition. Our guidelines ensure your brand voice and visual identity remain consistent across all platforms.',
    process: [
      'Brand Audit: Analyzing existing brand elements.',
      'Guidelines Development: Creating comprehensive usage rules.',
      'Documentation: Compiling all guidelines into a professional document.',
      'Implementation Support: Guidance for applying the guidelines.'
    ],
    features: [
      'Complete Brand Guidelines Document',
      'Logo Usage Guidelines',
      'Color Palette Specifications',
      'Typography Guidelines',
      'Brand Voice Documentation',
      'Implementation Examples',
      'Digital Asset Library'
    ],
    relatedServices: ['logo-design', 'packaging-design', 'corporate-stationery']
  },

  // Poster & Graphic Design
  {
    id: 'social-media-posters',
    description: 'Create engaging social media content that drives engagement and brand awareness. Our social media posters are designed to capture attention and communicate your message effectively across all social platforms.',
    whyChoose: 'Why choose professional social media posters? Each platform has different requirements and audience expectations. Our designs are optimized for maximum impact on Instagram, Facebook, and LinkedIn.',
    process: [
      'Strategy: Understanding your campaign goals and target audience.',
      'Design: Creating platform-specific poster designs.',
      'Optimization: Ensuring designs work across different formats.',
      'Delivery: Providing all necessary sizes and formats.'
    ],
    features: [
      'Platform-Specific Designs',
      'Multiple Size Variations',
      'High-Resolution Files',
      'Story and Post Formats',
      'Brand Consistent Styling',
      'Call-to-Action Integration'
    ],
    relatedServices: ['flyers-brochures', 'infographics', 'event-invitations']
  },
  {
    id: 'flyers-brochures',
    description: 'Communicate your message effectively with professionally designed flyers and brochures. Our print design services combine visual appeal with clear messaging to create marketing materials that convert.',
    whyChoose: 'Why choose professional flyer and brochure design? Well-designed print materials create lasting impressions and provide tangible value that digital marketing cannot match.',
    process: [
      'Content Analysis: Understanding your message and target audience.',
      'Layout Design: Creating effective visual hierarchies.',
      'Print Optimization: Ensuring designs work in print.',
      'Final Files: Preparing press-ready artwork.'
    ],
    features: [
      'Professional Layout Design',
      'Print-Ready Files',
      'Color Management',
      'Bleed and Crop Marks',
      'Multiple Format Options',
      'QR Code Integration'
    ],
    relatedServices: ['social-media-posters', 'infographics', 'restaurant-menu']
  },
  {
    id: 'infographics',
    description: 'Transform complex data into compelling visual stories with our infographic design service. We create informative and shareable content that engages your audience and establishes your expertise.',
    whyChoose: 'Why choose professional infographics? Visual data presentation is more engaging and memorable than text alone. Our infographics help you communicate complex information effectively.',
    process: [
      'Data Analysis: Understanding your information and key messages.',
      'Visual Strategy: Planning the most effective presentation format.',
      'Design Creation: Crafting visually appealing infographics.',
      'Optimization: Ensuring readability and shareability.'
    ],
    features: [
      'Custom Infographic Design',
      'Data Visualization',
      'Brand Integration',
      'Multiple Format Options',
      'Social Media Optimization',
      'Print-Ready Versions'
    ],
    relatedServices: ['social-media-posters', 'flyers-brochures', 'presentation-design']
  },

  // Outdoor Advertising & Media
  {
    id: 'billboard-design',
    description: 'Command attention with large-scale billboard designs that make a powerful impact. Our outdoor advertising designs are created to be visible from a distance and memorable in an instant.',
    whyChoose: 'Why choose professional billboard design? Outdoor advertising requires bold, simple designs that work from far away. Our expertise ensures your message gets noticed and remembered.',
    process: [
      'Location Analysis: Understanding viewing distance and conditions.',
      'Concept Development: Creating bold, impactful designs.',
      'Technical Specifications: Meeting outdoor advertising requirements.',
      'Final Production: Preparing files for large-format printing.'
    ],
    features: [
      'Large-Format Design',
      'High-Contrast Colors',
      'Simple, Bold Typography',
      'Weather-Resistant Considerations',
      'Brand Integration',
      'Multiple Size Options'
    ],
    relatedServices: ['shop-signboard', 'vehicle-wrapping', 'event-backdrops']
  },
  {
    id: 'shop-signboard',
    description: 'Create a professional first impression with custom shop signboard designs. Our signboard designs combine visibility, branding, and local regulations compliance.',
    whyChoose: 'Why choose professional signboard design? Your signboard is your storefront\'s first impression. Professional design ensures it attracts customers and complies with local regulations.',
    process: [
      'Site Assessment: Understanding location and visibility factors.',
      'Design Creation: Crafting brand-appropriate signage.',
      'Regulatory Compliance: Ensuring all legal requirements are met.',
      'Production Files: Preparing files for manufacturing.'
    ],
    features: [
      'Custom Signboard Design',
      'Regulatory Compliance',
      'Brand Integration',
      'Illumination Design (if applicable)',
      'Material Recommendations',
      'Installation Guidelines'
    ],
    relatedServices: ['billboard-design', 'retail-branding', 'neon-signage']
  },

  // Website Design & Development
  {
    id: 'business-website',
    description: 'Establish a professional online presence with our business website design service. We create websites that not only look great but also drive business results through excellent user experience and conversion optimization.',
    whyChoose: 'Why choose professional business websites? Your website is often the first interaction potential customers have with your business. Professional design builds trust and credibility.',
    process: [
      'Strategy: Defining goals and target audience.',
      'Design: Creating wireframes and visual designs.',
      'Development: Building responsive, functional websites.',
      'Launch: Testing, optimization, and deployment.'
    ],
    features: [
      'Responsive Design',
      'SEO Optimization',
      'Contact Forms',
      'Social Media Integration',
      'Analytics Setup',
      'Mobile Optimization',
      'Fast Loading Speed'
    ],
    relatedServices: ['ecommerce-website', 'wordpress-development', 'landing-pages']
  },
  {
    id: 'ecommerce-website',
    description: 'Launch a successful online store with our comprehensive e-commerce website development service. We create user-friendly shopping experiences that convert visitors into customers.',
    whyChoose: 'Why choose professional e-commerce development? Online shopping requires seamless user experience, secure payments, and inventory management. We provide complete solutions.',
    process: [
      'Requirements Gathering: Understanding your products and business needs.',
      'Platform Selection: Choosing the right e-commerce solution.',
      'Design & Development: Creating user-friendly shopping experience.',
      'Payment Integration: Setting up secure payment processing.'
    ],
    features: [
      'Complete E-commerce Solution',
      'Product Catalog Management',
      'Secure Payment Processing',
      'Inventory Management',
      'Order Management System',
      'Customer Accounts',
      'Mobile Shopping App'
    ],
    relatedServices: ['business-website', 'wordpress-development', 'website-maintenance']
  },
  {
    id: 'wordpress-development',
    description: 'Build a powerful, customizable website with our WordPress development service. We create flexible, scalable websites that grow with your business needs.',
    whyChoose: 'Why choose WordPress development? WordPress powers over 40% of websites worldwide. It offers flexibility, scalability, and a vast ecosystem of plugins and themes.',
    process: [
      'Planning: Defining site structure and requirements.',
      'Theme Customization: Creating or modifying themes.',
      'Plugin Development: Building custom functionality.',
      'Content Migration: Moving existing content if needed.'
    ],
    features: [
      'Custom WordPress Theme',
      'Plugin Development',
      'SEO Optimization',
      'Security Implementation',
      'Performance Optimization',
      'Training and Documentation',
      'Ongoing Support'
    ],
    relatedServices: ['business-website', 'ecommerce-website', 'website-maintenance']
  },

  // Digital Marketing
  {
    id: 'seo-services',
    description: 'Improve your search engine rankings and organic traffic with our comprehensive SEO service. We use proven strategies to help your website rank higher and attract qualified traffic.',
    whyChoose: 'Why choose professional SEO services? Organic search drives 53% of all website traffic. Professional SEO ensures sustainable, long-term growth for your business.',
    process: [
      'Audit: Analyzing current SEO status and opportunities.',
      'Strategy: Developing comprehensive SEO plan.',
      'Implementation: Executing on-page and off-page optimization.',
      'Monitoring: Tracking results and making adjustments.'
    ],
    features: [
      'Complete SEO Audit',
      'Keyword Research',
      'On-Page Optimization',
      'Content Optimization',
      'Link Building Strategy',
      'Monthly Reporting',
      'Performance Tracking'
    ],
    relatedServices: ['google-ads', 'social-media-management', 'content-writing']
  },
  {
    id: 'social-media-management',
    description: 'Build and engage your social media audience with our comprehensive management service. We create, schedule, and optimize content across all major social platforms.',
    whyChoose: 'Why choose professional social media management? Consistent, engaging content builds brand awareness and customer loyalty. We ensure your brand voice is consistent across all platforms.',
    process: [
      'Strategy Development: Creating platform-specific strategies.',
      'Content Creation: Developing engaging posts and visuals.',
      'Scheduling: Planning and automating content distribution.',
      'Engagement: Monitoring and responding to interactions.'
    ],
    features: [
      'Content Calendar Creation',
      'Post Design and Creation',
      'Community Management',
      'Performance Analytics',
      'Competitor Analysis',
      'Monthly Reports',
      'Crisis Management'
    ],
    relatedServices: ['seo-services', 'google-ads', 'content-writing']
  },
  {
    id: 'google-ads',
    description: 'Drive immediate traffic and conversions with expertly managed Google Ads campaigns. Our PPC specialists create and optimize campaigns that deliver measurable ROI.',
    whyChoose: 'Why choose professional Google Ads management? PPC advertising provides immediate visibility and measurable results. Our expertise ensures you get the best return on your advertising spend.',
    process: [
      'Research: Keyword and competitor analysis.',
      'Strategy: Developing campaign structure and targeting.',
      'Setup: Creating and launching campaigns.',
      'Optimization: Monitoring and improving performance.'
    ],
    features: [
      'Campaign Setup and Management',
      'Keyword Research',
      'Ad Copy Creation',
      'Landing Page Optimization',
      'Performance Monitoring',
      'A/B Testing',
      'Monthly Optimization Reports'
    ],
    relatedServices: ['seo-services', 'social-media-management', 'website-optimization']
  },

  // UI/UX Design
  {
    id: 'website-ui-design',
    description: 'Create stunning, user-friendly website interfaces with our UI/UX design service. We focus on both aesthetics and functionality to deliver exceptional user experiences.',
    whyChoose: 'Why choose professional UI/UX design? Good design isn\'t just about looks—it\'s about creating intuitive experiences that convert visitors into customers.',
    process: [
      'Research: Understanding users and business goals.',
      'Wireframing: Creating structural blueprints.',
      'Design: Crafting beautiful, functional interfaces.',
      'Testing: Validating designs with real users.'
    ],
    features: [
      'User Research & Analysis',
      'Wireframes & Prototypes',
      'High-Fidelity Mockups',
      'Design System Creation',
      'Usability Testing',
      'Interactive Prototypes',
      'Developer Handoff Files'
    ],
    relatedServices: ['mobile-app-ui', 'dashboard-ui', 'usability-testing']
  },
  {
    id: 'mobile-app-ui',
    description: 'Design intuitive and beautiful mobile app interfaces that users love. Our mobile UI/UX design service ensures your app provides exceptional user experiences across all devices.',
    whyChoose: 'Why choose professional mobile app UI design? Mobile users have high expectations. Great design keeps users engaged and drives app store success.',
    process: [
      'Discovery: Understanding app purpose and target users.',
      'User Flow Mapping: Planning optimal user journeys.',
      'Design Creation: Crafting platform-specific interfaces.',
      'Iteration: Refining based on feedback and testing.'
    ],
    features: [
      'iOS and Android Design',
      'User Flow Diagrams',
      'High-Fidelity Screens',
      'Interactive Prototypes',
      'Design System',
      'App Store Assets',
      'Developer Documentation'
    ],
    relatedServices: ['website-ui-design', 'dashboard-ui', 'prototype-walkthrough']
  },

  // Content Writing
  {
    id: 'blog-writing',
    description: 'Create engaging, SEO-optimized blog content that attracts and converts readers. Our professional writers craft compelling articles that establish your authority and drive traffic.',
    whyChoose: 'Why choose professional blog writing? Quality content is the foundation of successful digital marketing. Our writers create content that engages readers and performs well in search engines.',
    process: [
      'Keyword Research: Identifying target keywords and topics.',
      'Outline Creation: Structuring content for maximum impact.',
      'Writing: Crafting engaging, well-researched articles.',
      'Optimization: Ensuring SEO best practices and readability.'
    ],
    features: [
      'SEO-Optimized Content',
      'Keyword Research',
      'Engaging Headlines',
      'Professional Editing',
      'Meta Descriptions',
      'Internal Linking',
      'Social Media Snippets'
    ],
    relatedServices: ['website-copywriting', 'seo-services', 'social-media-captions']
  },
  {
    id: 'website-copywriting',
    description: 'Transform your website into a conversion machine with persuasive, user-focused copy. Our website copywriting service creates content that speaks to your audience and drives action.',
    whyChoose: 'Why choose professional website copywriting? Your website copy is your primary sales tool. Well-written copy converts visitors into customers and builds trust.',
    process: [
      'Audience Analysis: Understanding your target customers.',
      'Content Strategy: Planning messaging and tone.',
      'Copy Creation: Writing compelling, conversion-focused content.',
      'Optimization: A/B testing and performance improvement.'
    ],
    features: [
      'Homepage Copy',
      'About Page Content',
      'Service/Product Descriptions',
      'Call-to-Action Copy',
      'Landing Page Content',
      'Email Sequences',
      'Conversion Optimization'
    ],
    relatedServices: ['blog-writing', 'seo-services', 'landing-pages']
  },

  // Video Creation & Animation
  {
    id: 'promo-videos',
    description: 'Create compelling promotional videos that showcase your products, services, or brand story. Our video production service delivers professional content that engages audiences and drives results.',
    whyChoose: 'Why choose professional promo videos? Video content is 50x more likely to be shared on social media. Professional videos build trust and emotional connections with your audience.',
    process: [
      'Concept Development: Understanding your message and goals.',
      'Scripting: Crafting compelling narratives.',
      'Production: Filming with professional equipment.',
      'Post-Production: Editing, effects, and final polishing.'
    ],
    features: [
      'Professional Video Production',
      'Script Writing',
      'High-Quality Footage',
      'Professional Voiceover',
      'Custom Music/Graphics',
      'Multiple Formats',
      'Social Media Optimization'
    ],
    relatedServices: ['explainer-videos', 'corporate-videos', 'logo-animation']
  },
  {
    id: 'explainer-videos',
    description: 'Simplify complex ideas with engaging explainer videos that educate and entertain. Our animation and live-action explainer videos make difficult concepts easy to understand.',
    whyChoose: 'Why choose professional explainer videos? Complex products or services need clear explanation. Animated videos are perfect for breaking down complicated concepts.',
    process: [
      'Concept Planning: Understanding the topic and key messages.',
      'Script Development: Creating clear, engaging narration.',
      'Animation/Live-Action: Producing the visual content.',
      'Audio Production: Adding professional voiceover and music.'
    ],
    features: [
      '2D/3D Animation',
      'Whiteboard Animation',
      'Live-Action Footage',
      'Professional Voiceover',
      'Background Music',
      'Subtitles/Captions',
      'Multiple Length Options'
    ],
    relatedServices: ['promo-videos', 'corporate-videos', 'product-demos']
  },

  // Photography & Creative Media
  {
    id: 'product-photography',
    description: 'Showcase your products professionally with high-quality product photography. Our studio-quality photos highlight your products\' best features and create compelling e-commerce imagery.',
    whyChoose: 'Why choose professional product photography? High-quality photos are crucial for e-commerce success. Professional photography increases conversion rates and builds customer trust.',
    process: [
      'Product Preparation: Setting up products for optimal photography.',
      'Lighting Setup: Creating professional lighting conditions.',
      'Photography: Capturing multiple angles and variations.',
      'Post-Processing: Editing and retouching for perfection.'
    ],
    features: [
      'High-Resolution Images',
      'Multiple Angles & Views',
      'Lifestyle Shots',
      'White Background Options',
      'Product Variations',
      'Commercial Usage Rights',
      'Fast Turnaround'
    ],
    relatedServices: ['corporate-photoshoots', 'food-photography', 'ecommerce-setup']
  },
  {
    id: 'corporate-photoshoots',
    description: 'Create a professional image for your business with our corporate photography service. We capture authentic moments and professional headshots that represent your company culture.',
    whyChoose: 'Why choose professional corporate photography? Your company photos are often the first impression stakeholders have of your business. Professional photography builds credibility and trust.',
    process: [
      'Planning: Understanding your brand and photography goals.',
      'Location Scouting: Finding optimal shooting environments.',
      'Photography Session: Capturing authentic corporate moments.',
      'Post-Production: Editing and color correction.'
    ],
    features: [
      'Professional Headshots',
      'Office Environment Shots',
      'Team/Group Photos',
      'Corporate Event Coverage',
      'High-Resolution Files',
      'Online Gallery',
      'Usage Rights'
    ],
    relatedServices: ['product-photography', 'event-coverage', 'brand-photography']
  },
  {
    id: 'event-coverage',
    description: 'Document your important events with professional event photography and videography. We capture the moments that matter most to your organization or clients.',
    whyChoose: 'Why choose professional event coverage? Events are time-sensitive and irreplaceable. Professional documentation ensures you have high-quality content for marketing and memory-keeping.',
    process: [
      'Pre-Event Planning: Understanding event goals and key moments.',
      'On-Site Coverage: Professional photography throughout the event.',
      'Real-Time Editing: Immediate sharing of key photos if needed.',
      'Post-Event Delivery: Edited photos and video highlights.'
    ],
    features: [
      'Professional Photography',
      'Candid & Formal Shots',
      'Video Highlights',
      'Real-Time Sharing',
      'Online Gallery',
      'Print-Ready Files',
      'Usage Rights for Marketing'
    ],
    relatedServices: ['corporate-photoshoots', 'promo-videos', 'social-media-management']
  }
];

export const getServiceDetails = (serviceId: string): ServiceDetailsContent | undefined => {
  return servicesDetailsData.find(service => service.id === serviceId);
};
