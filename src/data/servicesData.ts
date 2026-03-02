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
  reviewCount?: number;
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

const defaultImages: Record<string, string> = {
  'Branding & Identity Design': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3F9YQh80lhpuXchpjbUGLE9SvviQ4bH3IFS2evIZkVRIq5VLAMDkYGZxSxwTN1CjQ97HVoq9wNut2BJCgCMiD_CCT004fjNgIAffapNnrMcE5a8YEVqHsyTP_9KayVJcgk4zqcZvsOLPnMnuZUqiMGx-zsBFZQrTBzS64Ux69cL_nQy74KG0wDx6SrQVuHg5Lik8Cwq6-UeGo-NQjkf5NurcN1Q8D5iJdiocC5rHrbeuWQ5ze4fgmLSnEZ6QB7ITyhuA3-nSjAvvY',
  'Poster & Graphic Design': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EEE2XkXW2vHrOhK9tPISIF4YgKZrX0-tyG-wgGN-T7wou1yeqOkBOwPS5ZnaihssNdk-FKUkHo5U3AanWIN5p_9DQYWm37YhUGK_DwXKwGI1sshobuTyP6NhhHsiSP7Ac4oF6PA-t3wLtKbGqr-HMJhVqYwmorlMm3FPaeQzw1qLmvHCoWvP0f1mYhMACgtPzhBW3YvRP1LR4xalgaq83jV83nVfYh9m8a_u9hlmNafA6ZqdAX0PglD3oKShaMpzUykCpGO68U-c',
  'Outdoor Advertising & Media': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2pay7_G5FbVSwFqT59q3veJlgFN-Z5RIsHyHQ8RtB-CwcDSyK8zkQ69AU7kDHpnzh292XMzhKtsb2f_QlWY9Ec0wSDgqh2BxdyXDmsCKwbmQbIsPqA8StlmqOGhUp_dw6xnQ4DSL2Hx0Wb8WeNTW8AKxLjDdg0etN1JpgTMnmYCe_aPdl89HzzETJPK6DbAN1dWTl0KXy6yM6PSAY-sv4eGetav2HxK_RAJqVBWI3LNLjJhar69Mav75vva4llB4IjJTOsAZ1HOX',
  'Website Design & Development': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EEE2XkXW2vHrOhK9tPISIF4YgKZrX0-tyG-wgGN-T7wou1yeqOkBOwPS5ZnaihssNdk-FKUkHo5U3AanWIN5p_9DQYWm37YhUGK_DwXKwGI1sshobuTyP6NhhHsiSP7Ac4oF6PA-t3wLtKbGqr-HMJhVqYwmorlMm3FPaeQzw1qLmvHCoWvP0f1mYhMACgtPzhBW3YvRP1LR4xalgaq83jV83nVfYh9m8a_u9hlmNafA6ZqdAX0PglD3oKShaMpzUykCpGO68U-c',
  'Digital Marketing': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP',
  'UI/UX Design': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy5t7eiMz5NnHnyGbdNZuPUv_19UpS3tPXRZyVAALZclhw7GEwfFVvjPedxt8SUxl4rnCuVy8RDAf4-MyhMUSCoJuUc2pF-aYeho_RoWO76o9IZDDj3Ti2OUo1h33KHE4QhZNiVrZ3WYuBMKtkfJmUH0mi3Ou4gY2uBS7MLWukazSHXj2ZkSb-4EP_uLJoaOqyYcWUDd-9Tm2YYaM6bqan2f4l9zPJGdekWnUKn6aIpMCefHVenZZOZfed4igUYCc-3fIxO1jQbmR',
  'Content Writing': 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CvUGRdCpR4CT2oBHrUADTmqfG8aAXibtD3WeN8xYae9qQbNmWq2C1mA6CVqc4J4ffYKXityR17y8YL2IlQDqkhC1wv2dyGzLmVKMV_H7kb53ilfv5PFF4vAUZMXYcGEe4UkAnP4YukquX5dDabgm3i3lDAbNPtlnB4rSevHfIbRyPH-Vfvrulw3VhNJNvodPpDVKhtFKexfk9cr6FhrHIjEvmXaY-YxWP-qg39LjkC8qXIpP1uRpMtUDShVozInwARnvD8_M-2dO',
  'Video Creation & Animation': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAznwr7lnocsFYT8cYV5X-wFDKrBdQGi7AgHLmeaczZK5RDMvYQUAyiMAhLDBSe3zGoeBhvtQgzCSZkGnQG69iJnyhkCeI25ZzJU4QtWz4K5jWZD75u8B2-zdGEocaZ0dDzVl2xiTD0RBRnV3-I-NPg2zuteOGs4Y2JFjNCw0rYf5qjmhOJ614ibG5MJScLQipN3nFVtTifgvGTVyy7wQU3i--hLAIuvEkRDpuHS9RkNkL9ScZjEdEJZPZFcakUh5c4KIOXSu48dUbz',
  'Photography & Creative Media': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBs5H4J8lcnIJ73N3zEZzugtJy-AuBs2M5xQ3zQHZJmjS2UYafxtE_3p3rxUPRtucxlROswa2t66lnfXJ4qKoXhsfiZKISedzTRwI4gluApF9mYMO_fvTtTSroLs5cXss7Uds-yR7TU4cLaMwsfH_i07i4q0qyktYAWK94QutNrYAPnbYbGrm92XlksekRNxKIa5Av5nPT-6MCGCfj75O7IkAUouFEVYk230WfN_aXvWmOWwdoueAFBCl5JcSaBeafVR6W4RXfbZTX'
};

const defaultPricing: Record<string, { price: string; duration: string }> = {
  'Branding & Identity Design': { price: '₹1000', duration: '3 Days' },
  'Poster & Graphic Design': { price: '₹999', duration: '2 Days' },
  'Outdoor Advertising & Media': { price: '₹3,499', duration: '5 Days' },
  'Website Design & Development': { price: '₹9,999', duration: '12 Days' },
  'Digital Marketing': { price: '₹5,999', duration: '28 Days' },
  'UI/UX Design': { price: '₹4,999', duration: '7 Days' },
  'Content Writing': { price: '₹1,199', duration: '3 Days' },
  'Video Creation & Animation': { price: '₹6,999', duration: '9 Days' },
  'Photography & Creative Media': { price: '₹2,499', duration: '4 Days' }
};

const slugify = (s: string) =>
  s.replace(/\([^)]*\)/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Deterministic number generator based on string id
const seedNumber = (str: string): number => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return Math.abs(h >>> 0);
};

// Create realistic variations for price, duration, rating, and reviews
const varyPricing = (basePriceInr: number, id: string, category: string): number => {
  const s = seedNumber(id + category);
  const swingPct = ((s % 21) - 10) / 100; // -10% .. +10%
  const adjusted = Math.max(300, Math.round(basePriceInr * (1 + swingPct)));
  const roundRetail = (n: number): number => {
    const hundreds = Math.floor(n / 100);
    const candidate99 = hundreds * 100 + 99;
    const candidate00 = (Math.round(n / 100)) * 100;
    const best = Math.abs(n - candidate99) <= Math.abs(n - candidate00) ? candidate99 : candidate00;
    return Math.max(300, best);
  };
  return roundRetail(adjusted);
};

const varyDurationDays = (baseDays: number, id: string): number => {
  const s = seedNumber(id);
  const swing = (s % 5) - 2; // -2 .. +2 days
  const d = Math.max(1, baseDays + swing);
  return d;
};

const varyRating = (base: number, id: string, flags: { bestseller?: boolean; trending?: boolean }): number => {
  const s = seedNumber(id);
  const swing = ((s % 7) - 3) / 10; // -0.3 .. +0.3
  let r = base + swing;
  if (flags.bestseller) r += 0.15;
  if (flags.trending) r += 0.1;
  r = Math.min(4.9, r);
  r = Math.max(4.1, r);
  return Math.round(r * 10) / 10;
};

const computeReviews = (id: string, rating: number, flags: { bestseller?: boolean; trending?: boolean }): number => {
  const s = seedNumber(id + 'reviews');
  let base = 25 + (s % 800); // 25 .. 824
  if (flags.bestseller) base += 250;
  if (flags.trending) base += 100;
  // higher ratings correlate with more reviews
  base += Math.floor((rating - 4.0) * 120);
  return Math.min(2500, base);
};

const manualOverrides: Record<string, Partial<Service>> = {
  'logo-design': { rating: '5.0', isBestseller: true },
  'explainer-videos': { rating: '4.9', isTrending: true },
  'business-website': { price: '₹8,000', duration: '10 Days', rating: '4.9' },
  'ecommerce-website': { price: '₹15,000', duration: '14 Days', rating: '4.8' },
  'wordpress-development': { price: '₹6,000', duration: '8 Days', rating: '4.9' },
  'social-media-management': { price: '₹5,000', duration: '30 Days', rating: '4.9' },
  'google-ads': { price: '₹4,000', duration: '15 Days', rating: '4.8' },
  'product-photography': { price: '₹1,200', duration: '3 Days', rating: '4.9' },
  'corporate-photoshoots': { price: '₹3,000', duration: '5 Days', rating: '4.8' },
  'event-coverage': { price: '₹4,000', duration: '7 Days', rating: '4.9' }
};

const buildServices = (): Service[] => {
  const list: Service[] = [];
  categories.forEach((cat) => {
    const defaults = defaultPricing[cat.name];
    cat.subservices.forEach((sub) => {
      const id = slugify(sub);
      const title = sub.replace(/\([^)]*\)/g, '').trim();
      const base: Service = {
        id,
        title,
        category: cat.name,
        price: defaults?.price || '₹1,000',
        duration: defaults?.duration || '3 Days',
        rating: '4.8',
        image: defaultImages[cat.name]
      };
      const override = manualOverrides[id] || {};
      const merged: Service = { ...base, ...override };

      // Derive numeric base values
      const basePriceInr = parseFloat((defaults?.price || '₹1,000').replace('₹', '').replace(/,/g, '')) || 1000;
      const baseDays = parseInt((defaults?.duration || '3 Days').split(' ')[0]) || 3;

      // Apply realistic variations
      const priceInr = varyPricing(basePriceInr, id, cat.name);
      const durationDays = varyDurationDays(baseDays, id);
      const ratingNum = varyRating(parseFloat((override.rating || base.rating || '4.6') as string), id, {
        bestseller: !!merged.isBestseller,
        trending: !!merged.isTrending
      });
      const reviews = computeReviews(id, ratingNum, { bestseller: !!merged.isBestseller, trending: !!merged.isTrending });

      merged.price = `₹${priceInr.toLocaleString('en-IN')}`;
      const rangeWidth = 1 + (seedNumber(id + 'range') % 3); // 1..3
      merged.duration = `${durationDays}–${durationDays + rangeWidth} Days`;
      merged.rating = ratingNum.toFixed(1);
      merged.reviewCount = reviews;

      list.push(merged);
    });
  });
  return list;
};

export const services: Service[] = buildServices();

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
