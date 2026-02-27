export interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
  rating: string;
  image: string;
  isBestseller?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subservices: string[];
}

export const categories: Category[] = [
  {
    id: 'branding-identity',
    name: 'Branding & Identity Design',
    icon: 'branding_watermark',
    subservices: [
      'Logo Design',
      'Business Card Design',
      'Letterhead Design',
      'Brand Guidelines Creation',
      'Social Profile Kit (Profile + Cover Banners)',
      'Packaging Design (Box, Label, Bottle, etc.)',
      'Merchandise Design (T-Shirts, Mugs, Caps, etc.)',
      'Brand Naming / Tagline Creation',
      'Corporate Stationery Kit (Envelopes, Notepads, Email Signatures)',
      '3D Logo Mockups (Office Wall / Signboard Presentation)'
    ]
  },
  {
    id: 'poster-graphic',
    name: 'Poster & Graphic Design',
    icon: 'brush',
    subservices: [
      'Social Media Posters (Instagram, Facebook, LinkedIn)',
      'Event Invitations (Digital & Print)',
      'Flyers / Brochures',
      'Certificates / ID Cards',
      'Print Design (Flex, Banner, Pamphlet)',
      'Infographics',
      'Magazine / Booklet Design',
      'Restaurant Menu Design',
      'Festival Campaign Templates (Diwali, Holi, Independence Day, etc.)',
      'Political Campaign Posters / Election Material',
      'Infographic Resume / CV Design'
    ]
  },
  {
    id: 'outdoor-advertising',
    name: 'Outdoor Advertising & Media',
    icon: 'campaign',
    subservices: [
      'Billboard / Hoarding Design',
      'Wallscape Advertising Design',
      'Transit Ads (Bus, Auto, Metro Panels)',
      'Digital Screen Ads (Mall, Airport, Cafe, Outdoor LED)',
      'Event Backdrops & Stage Branding',
      'Retail Branding (Shop Signage, Display Boards, Standees)',
      'Shop Signboard / Glow Signage',
      'Neon Signage Design',
      'Mall / Retail Kiosk Branding',
      'Vehicle Wrapping (Car/Van Full Body Ads)',
      'Airport Lounge / Waiting Area Branding'
    ]
  },
  {
    id: 'website-development',
    name: 'Website Design & Development',
    icon: 'code',
    subservices: [
      'Portfolio Websites',
      'Business Websites',
      'E-Commerce Websites',
      'WordPress Development',
      'Static/HTML Websites',
      'Custom Web Applications',
      'Domain & Hosting Setup',
      'Website Maintenance / Updates',
      'Landing Pages / Sales Funnels',
      'Website Redesign / Revamp',
      'Multi-vendor Marketplace Websites',
      'Booking & Appointment Portals (Doctor, Salon, Hotel)',
      'Learning Management Systems (LMS / Online Courses)',
      'Membership / Subscription Websites'
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'ads_click',
    subservices: [
      'Search Engine Optimization (SEO)',
      'Meta (Facebook/Instagram) Ads',
      'Google Ads',
      'Social Media Management',
      'Email Campaigns (Mailchimp, Brevo, Zoho)',
      'WhatsApp/Telegram Marketing',
      'Influencer Marketing',
      'Online Reputation Management',
      'Analytics & Reporting',
      'TikTok / Moj / Josh Ads Campaigns',
      'Podcast Marketing',
      'LinkedIn Lead Generation Campaigns',
      'SMS Marketing',
      'Chatbot Automation (Meta, WhatsApp, Website)'
    ]
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    icon: 'layers',
    subservices: [
      'Website UI Design',
      'Mobile App UI',
      'Dashboard / SaaS UI',
      'Wireframing (Low & High Fidelity)',
      'Prototype Walkthrough',
      'User Journey Mapping',
      'Design System / Component Library',
      'Usability Testing',
      'AR/VR UI Design',
      'Smartwatch UI Design',
      'Car Infotainment UI Design',
      'Gamification-based UI/UX Elements'
    ]
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    icon: 'edit_note',
    subservices: [
      'Website Copywriting',
      'Blog Writing',
      'Product Descriptions',
      'Ad Copy / Slogans',
      'Video Scripts (YouTube/Reels/Ads)',
      'SEO Optimized Content',
      'Technical/Research-Based Articles',
      'Whitepapers / Case Studies',
      'Press Releases',
      'Social Media Captions & Hashtag Strategy',
      'eBook Writing & Design',
      'LinkedIn Ghostwriting (for professionals)',
      'Podcast Scriptwriting',
      'Brand Storytelling'
    ]
  },
  {
    id: 'video-animation',
    name: 'Video Creation & Animation',
    icon: 'movie_creation',
    subservices: [
      'Promo Videos (Business, Offers)',
      'Explainer Videos',
      'Reels / Shorts Editing',
      'Logo Animation / Intros',
      'Voiceover (Multi-language)',
      'Subtitle + Translation',
      'Motion Posters',
      'Product Demo Videos',
      '2D/3D Animation',
      'Corporate Presentation Videos',
      'Corporate Documentary Videos',
      'Wedding Invitation Animation',
      'Festival Greetings Animation (New Year, Diwali, Eid, etc.)',
      '360° Virtual Tours (Hotels, Real Estate, Showrooms)',
      'AR Filters (Instagram, Snapchat, TikTok custom filters)'
    ]
  },
  {
    id: 'photography-media',
    name: 'Photography & Creative Media',
    icon: 'camera_alt',
    subservices: [
      'Product Photography',
      'Corporate Photoshoots',
      'Event Coverage (Launch, Exhibition)',
      'Food Photography',
      'Lifestyle Photography',
      'Drone Shoots',
      'Model / Portfolio Shoots',
      'Fashion Photography',
      'Jewelry & Luxury Product Photography',
      'Virtual Staging (for Real Estate)',
      '360° Photography (Google Street View style)'
    ]
  }
];

export const services: Service[] = [
  // Branding & Identity Design
  {
    id: 'logo-design',
    title: 'Logo Design',
    category: 'Branding & Identity Design',
    price: '₹1,500',
    duration: '3 Days',
    rating: '5.0',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3F9YQh80lhpuXchpjbUGLE9SvviQ4bH3IFS2evIZkVRIq5VLAMDkYGZxSxwTN1CjQ97HVoq9wNut2BJCgCMiD_CCT004fjNgIAffapNnrMcE5a8YEVqHsyTP_9KayVJcgk4zqcZvsOLPnMnuZUqiMGx-zsBFZQrTBzS64Ux69cL_nQy74KG0wDx6SrQVuHg5Lik8Cwq6-UeGo-NQjkf5NurcN1Q8D5iJdiocC5rHrbeuWQ5ze4fgmLSnEZ6QB7ITyhuA3-nSjAvvY',
    isBestseller: true
  },
  {
    id: 'business-card-design',
    title: 'Business Card Design',
    category: 'Branding & Identity Design',
    price: '₹800',
    duration: '2 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP'
  },
  {
    id: 'brand-guidelines',
    title: 'Brand Guidelines Creation',
    category: 'Branding & Identity Design',
    price: '₹3,500',
    duration: '7 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy5t7eiMz5NnHnyGbdNZuPUv_19UpS3tPXRZyVAALZclhw7GEwfFVvjPedxt8SUxl4rnCuVy8RDAf4-MyhMUSCoJuUc2pF-aYeho_RoWO76o9IZDDj3Ti2OUo1h33KHE4QhZNiVrZ3WYuBMKtkfJmUH0mi3Ou4gY2uBS7MLWukazSHXj2ZkSb-4EP_uLJoaOqyYcWUDd-9Tm2YYaM6bqan2f4l9zPJGdekWnUKn6aIpMCefHVenZZOZfed4igUYCc-3fIxO1jQbmR'
  },

  // Poster & Graphic Design
  {
    id: 'social-media-posters',
    title: 'Social Media Posters',
    category: 'Poster & Graphic Design',
    price: '₹800',
    duration: '3 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP'
  },
  {
    id: 'flyers-brochures',
    title: 'Flyers / Brochures',
    category: 'Poster & Graphic Design',
    price: '₹1,200',
    duration: '4 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EEE2XkXW2vHrOhK9tPISIF4YgKZrX0-tyG-wgGN-T7wou1yeqOkBOwPS5ZnaihssNdk-FKUkHo5U3AanWIN5p_9DQYWm37YhUGK_DwXKwGI1sshobuTyP6NhhHsiSP7Ac4oF6PA-t3wLtKbGqr-HMJhVqYwmorlMm3FPaeQzw1qLmvHCoWvP0f1mYhMACgtPzhBW3YvRP1LR4xalgaq83jV83nVfYh9m8a_u9hlmNafA6ZqdAX0PglD3oKShaMpzUykCpGO68U-c'
  },
  {
    id: 'infographics',
    title: 'Infographics',
    category: 'Poster & Graphic Design',
    price: '₹2,000',
    duration: '5 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CvUGRdCpR4CT2oBHrUADTmqfG8aAXibtD3WeN8xYae9qQbNmWq2C1mA6CVqc4J4ffYKXityR17y8YL2IlQDqkhC1wv2dyGzLmVKMV_H7kb53ilfv5PFF4vAUZMXYcGEe4UkAnP4YukquX5dDabgm3i3lDAbNPtlnB4rSevHfIbRyPH-Vfvrulw3VhNJNvodPpDVKhtFKexfk9cr6FhrHIjEvmXaY-YxWP-qg39LjkC8qXIpP1uRpMtUDShVozInwARnvD8_M-2dO'
  },

  // Outdoor Advertising & Media
  {
    id: 'billboard-design',
    title: 'Billboard / Hoarding Design',
    category: 'Outdoor Advertising & Media',
    price: '₹3,000',
    duration: '5 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2pay7_G5FbVSwFqT59q3veJlgFN-Z5RIsHyHQ8RtB-CwcDSyK8zkQ69AU7kDHpnzh292XMzhKtsb2f_QlWY9Ec0wSDgqh2BxdyXDmsCKwbmQbIsPqA8StlmqOGhUp_dw6xnQ4DSL2Hx0Wb8WeNTW8AKxLjDdg0etN1JpgTMnmYCe_aPdl89HzzETJPK6DbAN1dWTl0KXy6yM6PSAY-sv4eGetav2HxK_RAJqVBWI3LNLjJhar69Mav75vva4llB4IjJTOsAZ1HOX'
  },
  {
    id: 'shop-signboard',
    title: 'Shop Signboard / Glow Signage',
    category: 'Outdoor Advertising & Media',
    price: '₹2,500',
    duration: '4 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2pay7_G5FbVSwFqT59q3veJlgFN-Z5RIsHyHQ8RtB-CwcDSyK8zkQ69AU7kDHpnzh292XMzhKtsb2f_QlWY9Ec0wSDgqh2BxdyXDmsCKwbmQbIsPqA8StlmqOGhUp_dw6xnQ4DSL2Hx0Wb8WeNTW8AKxLjDdg0etN1JpgTMnmYCe_aPdl89HzzETJPK6DbAN1dWTl0KXy6yM6PSAY-sv4eGetav2HxK_RAJqVBWI3LNLjJhar69Mav75vva4llB4IjJTOsAZ1HOX'
  },

  // Website Design & Development
  {
    id: 'business-website',
    title: 'Business Websites',
    category: 'Website Design & Development',
    price: '₹8,000',
    duration: '10 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EEE2XkXW2vHrOhK9tPISIF4YgKZrX0-tyG-wgGN-T7wou1yeqOkBOwPS5ZnaihssNdk-FKUkHo5U3AanWIN5p_9DQYWm37YhUGK_DwXKwGI1sshobuTyP6NhhHsiSP7Ac4oF6PA-t3wLtKbGqr-HMJhVqYwmorlMm3FPaeQzw1qLmvHCoWvP0f1mYhMACgtPzhBW3YvRP1LR4xalgaq83jV83nVfYh9m8a_u9hlmNafA6ZqdAX0PglD3oKShaMpzUykCpGO68U-c'
  },
  {
    id: 'ecommerce-website',
    title: 'E-Commerce Websites',
    category: 'Website Design & Development',
    price: '₹15,000',
    duration: '14 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EEE2XkXW2vHrOhK9tPISIF4YgKZrX0-tyG-wgGN-T7wou1yeqOkBOwPS5ZnaihssNdk-FKUkHo5U3AanWIN5p_9DQYWm37YhUGK_DwXKwGI1sshobuTyP6NhhHsiSP7Ac4oF6PA-t3wLtKbGqr-HMJhVqYwmorlMm3FPaeQzw1qLmvHCoWvP0f1mYhMACgtPzhBW3YvRP1LR4xalgaq83jV83nVfYh9m8a_u9hlmNafA6ZqdAX0PglD3oKShaMpzUykCpGO68U-c'
  },
  {
    id: 'wordpress-development',
    title: 'WordPress Development',
    category: 'Website Design & Development',
    price: '₹6,000',
    duration: '8 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi8wq2Z0MtO1W1mqlP5MP_c2l8AUHT5j5_TvXuRRlaN5D2XnCtaxM2ADQHlwi3XhsLq0pzB-9NY7M4iMUrv8CuXcvsNFz0BUAw9mgHngAstWdw6-6X8iWLrQgbd4fTSQVEHAWBZrSEQBLw1FX5Y6eKIPW5GuggPsMUsCRmHkbre9ENQMwOI7RD2eVLr0p7TaTgXphIpXt9A1dQ66DUcs5HjCqzgONC-IDBBDa7g8t_XiYAbSElBNFjveEC3Mhpwci3i-w2OSPGKVCK'
  },

  // Digital Marketing
  {
    id: 'seo-services',
    title: 'Search Engine Optimization (SEO)',
    category: 'Digital Marketing',
    price: '₹3,000',
    duration: '30 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP'
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    category: 'Digital Marketing',
    price: '₹5,000',
    duration: '30 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP'
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    category: 'Digital Marketing',
    price: '₹4,000',
    duration: '15 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP'
  },

  // UI/UX Design
  {
    id: 'website-ui-design',
    title: 'Website UI Design',
    category: 'UI/UX Design',
    price: '₹3,500',
    duration: '7 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy5t7eiMz5NnHnyGbdNZuPUv_19UpS3tPXRZyVAALZclhw7GEwfFVvjPedxt8SUxl4rnCuVy8RDAf4-MyhMUSCoJuUc2pF-aYeho_RoWO76o9IZDDj3Ti2OUo1h33KHE4QhZNiVrZ3WYuBMKtkfJmUH0mi3Ou4gY2uBS7MLWukazSHXj2ZkSb-4EP_uLJoaOqyYcWUDd-9Tm2YYaM6bqan2f4l9zPJGdekWnUKn6aIpMCefHVenZZOZfed4igUYCc-3fIxO1jQbmR'
  },
  {
    id: 'mobile-app-ui',
    title: 'Mobile App UI',
    category: 'UI/UX Design',
    price: '₹4,500',
    duration: '8 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy5t7eiMz5NnHnyGbdNZuPUv_19UpS3tPXRZyVAALZclhw7GEwfFVvjPedxt8SUxl4rnCuVy8RDAf4-MyhMUSCoJuUc2pF-aYeho_RoWO76o9IZDDj3Ti2OUo1h33KHE4QhZNiVrZ3WYuBMKtkfJmUH0mi3Ou4gY2uBS7MLWukazSHXj2ZkSb-4EP_uLJoaOqyYcWUDd-9Tm2YYaM6bqan2f4l9zPJGdekWnUKn6aIpMCefHVenZZOZfed4igUYCc-3fIxO1jQbmR'
  },

  // Content Writing
  {
    id: 'blog-writing',
    title: 'Blog Writing',
    category: 'Content Writing',
    price: '₹600',
    duration: '3 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CvUGRdCpR4CT2oBHrUADTmqfG8aAXibtD3WeN8xYae9qQbNmWq2C1mA6CVqc4J4ffYKXityR17y8YL2IlQDqkhC1wv2dyGzLmVKMV_H7kb53ilfv5PFF4vAUZMXYcGEe4UkAnP4YukquX5dDabgm3i3lDAbNPtlnB4rSevHfIbRyPH-Vfvrulw3VhNJNvodPpDVKhtFKexfk9cr6FhrHIjEvmXaY-YxWP-qg39LjkC8qXIpP1uRpMtUDShVozInwARnvD8_M-2dO'
  },
  {
    id: 'website-copywriting',
    title: 'Website Copywriting',
    category: 'Content Writing',
    price: '₹1,200',
    duration: '4 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CvUGRdCpR4CT2oBHrUADTmqfG8aAXibtD3WeN8xYae9qQbNmWq2C1mA6CVqc4J4ffYKXityR17y8YL2IlQDqkhC1wv2dyGzLmVKMV_H7kb53ilfv5PFF4vAUZMXYcGEe4UkAnP4YukquX5dDabgm3i3lDAbNPtlnB4rSevHfIbRyPH-Vfvrulw3VhNJNvodPpDVKhtFKexfk9cr6FhrHIjEvmXaY-YxWP-qg39LjkC8qXIpP1uRpMtUDShVozInwARnvD8_M-2dO'
  },

  // Video Creation & Animation
  {
    id: 'promo-videos',
    title: 'Promo Videos (Business, Offers)',
    category: 'Video Creation & Animation',
    price: '₹8,000',
    duration: '10 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAznwr7lnocsFYT8cYV5X-wFDKrBdQGi7AgHLmeaczZK5RDMvYQUAyiMAhLDBSe3zGoeBhvtQgzCSZkGnQG69iJnyhkCeI25ZzJU4QtWz4K5jWZD75u8B2-zdGEocaZ0dDzVl2xiTD0RBRnV3-I-NPg2zuteOGs4Y2JFjNCw0rYf5qjmhOJ614ibG5MJScLQipN3nFVtTifgvGTVyy7wQU3i--hLAIuvEkRDpuHS9RkNkL9ScZjEdEJZPZFcakUh5c4KIOXSu48dUbz'
  },
  {
    id: 'explainer-videos',
    title: 'Explainer Videos',
    category: 'Video Creation & Animation',
    price: '₹6,000',
    duration: '8 Days',
    rating: '4.9',
    isTrending: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAznwr7lnocsFYT8cYV5X-wFDKrBdQGi7AgHLmeaczZK5RDMvYQUAyiMAhLDBSe3zGoeBhvtQgzCSZkGnQG69iJnyhkCeI25ZzJU4QtWz4K5jWZD75u8B2-zdGEocaZ0dDzVl2xiTD0RBRnV3-I-NPg2zuteOGs4Y2JFjNCw0rYf5qjmhOJ614ibG5MJScLQipN3nFVtTifgvGTVyy7wQU3i--hLAIuvEkRDpuHS9RkNkL9ScZjEdEJZPZFcakUh5c4KIOXSu48dUbz'
  },

  // Photography & Creative Media
  {
    id: 'product-photography',
    title: 'Product Photography',
    category: 'Photography & Creative Media',
    price: '₹1,200',
    duration: '3 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBs5H4J8lcnIJ73N3zEZzugtJy-AuBs2M5xQ3zQHZJmjS2UYafxtE_3p3rxUPRtucxlROswa2t66lnfXJ4qKoXhsfiZKISedzTRwI4gluApF9mYMO_fvTtTSroLs5cXss7Uds-yR7TU4cLaMwsfH_i07i4q0qyktYAWK94QutNrYAPnbYbGrm92XlksekRNxKIa5Av5nPT-6MCGCfj75O7IkAUouFEVYk230WfN_aXvWmOWwdoueAFBCl5JcSaBeafVR6W4RXfbZTX'
  },
  {
    id: 'corporate-photoshoots',
    title: 'Corporate Photoshoots',
    category: 'Photography & Creative Media',
    price: '₹3,000',
    duration: '5 Days',
    rating: '4.8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBs5H4J8lcnIJ73N3zEZzugtJy-AuBs2M5xQ3zQHZJmjS2UYafxtE_3p3rxUPRtucxlROswa2t66lnfXJ4qKoXhsfiZKISedzTRwI4gluApF9mYMO_fvTtTSroLs5cXss7Uds-yR7TU4cLaMwsfH_i07i4q0qyktYAWK94QutNrYAPnbYbGrm92XlksekRNxKIa5Av5nPT-6MCGCfj75O7IkAUouFEVYk230WfN_aXvWmOWwdoueAFBCl5JcSaBeafVR6W4RXfbZTX'
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage (Launch, Exhibition)',
    category: 'Photography & Creative Media',
    price: '₹4,000',
    duration: '7 Days',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBs5H4J8lcnIJ73N3zEZzugtJy-AuBs2M5xQ3zQHZJmjS2UYafxtE_3p3rxUPRtucxlROswa2t66lnfXJ4qKoXhsfiZKISedzTRwI4gluApF9mYMO_fvTtTSroLs5cXss7Uds-yR7TU4cLaMwsfH_i07i4q0qyktYAWK94QutNrYAPnbYbGrm92XlksekRNxKIa5Av5nPT-6MCGCfj75O7IkAUouFEVYk230WfN_aXvWmOWwdoueAFBCl5JcSaBeafVR6W4RXfbZTX'
  }
];

export const getServicesByCategory = (categoryName: string): Service[] => {
  return services.filter(service => service.category === categoryName);
};

export const searchServices = (query: string): Service[] => {
  const lowercaseQuery = query.toLowerCase();
  return services.filter(service =>
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.category.toLowerCase().includes(lowercaseQuery)
  );
};
