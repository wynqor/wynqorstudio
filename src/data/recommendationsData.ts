export interface Recommendation {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: string;
}

export const recommendationsData: Recommendation[] = [
  {
    id: 'social-media-management',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS2pay7_G5FbVSwFqT59q3veJlgFN-Z5RIsHyHQ8RtB-CwcDSyK8zkQ69AU7kDHpnzh292XMzhKtsb2f_QlWY9Ec0wSDgqh2BxdyXDmsCKwbmQbIsPqA8StlmqOGhUp_dw6xnQ4DSL2Hx0Wb8WeNTW8AKxLjDdg0etN1JpgTMnmYCe_aPdl89HzzETJPK6DbAN1dWTl0KXy6yM6PSAY-sv4eGetav2HxK_RAJqVBWI3LNLjJhar69Mav75vva4llB4IjJTOsAZ1HOX',
    category: 'Digital Marketing',
    title: 'Social Media Management Monthly',
    description: 'Complete social media strategy with content creation, posting schedule, and community management.',
    price: '₹5,000/mo'
  },
  {
    id: 'product-packaging-design',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLqKN7izwbiUmkazVuSykHcmS3fOEOaNinbCErc_SNB-txaJIqfE3U3HoGAoYp22h5Yab-DI6fI4lZGYYjZsEdu1z5_UEjfKNAPc69nUbX_ny8lNVvs97KRuAu9Ro-L9Ni_mMXm7lyf6Ui33rG1mzlQWENaKlfnkbuBbKh_psOdw1Mgfz5xxd8mWNqd3MzjOz-RKt-o1IqnL3mFTT5amF5y5U0XHQzxtVApouU5a17ZwYg4XE73Bd8hYQstVT7rqilZiyHpzjls_50',
    category: 'Branding & Identity Design',
    title: 'Product Packaging Design Suite',
    description: 'Complete packaging design including box, label, and insert designs for product presentation.',
    price: '₹3,800'
  },
  {
    id: 'professional-voice-over',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCopIK18XDvERR1Q6YndzkXEwZFuY1as38tdmx2ubC0Uq5twGTSdRy8ZtyXBBO4m18w_qKLDi0NLj0h-tHXWqMH1GBUfLGLPpV67ncY4DpbZqoqt8yj65KbJFgNkFyT6upVS_SnZgUt-eVjwYfwchmYfQ3Th71u8K3BTn_rENRQ8SKwm0NyUBBjSYRnNve1B-BhOUz0lDg-ecBwdxJCHMtPHVmJ322aXOYGH57pfwUl1J-P80L2sIOVak6YeGdxw4I4qUgmRIWhbJEc',
    category: 'Video Creation & Animation',
    title: 'Professional Voice Over (English)',
    description: 'Studio-quality voice over recording with professional narration for videos and presentations.',
    price: '₹1,200'
  },
  {
    id: 'website-seo-optimization',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU8Cf4ez2ExyjNG58-Fmc53uRZrmCG1BWV4in3p-HFSRg6B6Ap47n_4iEqTkTWFIJO7_3FPULlQsHymD_5LIBKJRGwyFjvFFfPerTPNTzyyjTUGHsdOc5EUTxeK-dKj8qXfF-YXfhLVvfEozyWpwNcF9OSIoTfvoH8wreMdUgRQ_8a8yZcVWgk0J_rKs8UAO7GcpzF-nLeW_9B9P0hewh-H8TA7u8U2nzzzdw7Dv4R6MXbkUR8TSCCfhA0Cqb2vZtQHbnI3HFv2lEP',
    category: 'Digital Marketing',
    title: 'Complete SEO Optimization Package',
    description: 'Comprehensive SEO audit and optimization to improve search rankings and organic traffic.',
    price: '₹6,500'
  },
  {
    id: 'corporate-brand-photography',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBs5H4J8lcnIJ73N3zEZzugtJy-AuBs2M5xQ3zQHZJmjS2UYafxtE_3p3rxUPRtucxlROswa2t66lnfXJ4qKoXhsfiZKISedzTRwI4gluApF9mYMO_fvTtTSroLs5cXss7Uds-yR7TU4cLaMwsfH_i07i4q0qyktYAWK94QutNrYAPnbYbGrm92XlksekRNxKIa5Av5nPT-6MCGCfj75O7IkAUouFEVYk230WfN_aXvWmOWwdoueAFBCl5JcSaBeafVR6W4RXfbZTX',
    category: 'Photography & Creative Media',
    title: 'Corporate Brand Photography',
    description: 'Professional corporate photography including headshots, office shots, and brand imagery.',
    price: '₹4,200'
  },
  {
    id: 'mobile-app-ui-design',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHy5t7eiMz5NnHnyGbdNZuPUv_19UpS3tPXRZyVAALZclhw7GEwfFVvjPedxt8SUxl4rnCuVy8RDAf4-MyhMUSCoJuUc2pF-aYeho_RoWO76o9IZDDj3Ti2OUo1h33KHE4QhZNiVrZ3WYuBMKtkfJmUH0mi3Ou4gY2uBS7MLWukazSHXj2ZkSb-4EP_uLJoaOqyYcWUDd-9Tm2YYaM6bqan2f4l9zPJGdekWnUKn6aIpMCefHVenZZOZfed4igUYCc-3fIxO1jQbmR',
    category: 'UI/UX Design',
    title: 'Mobile App UI/UX Design',
    description: 'Complete mobile app design with intuitive user interface and exceptional user experience.',
    price: '₹5,800'
  }
];
