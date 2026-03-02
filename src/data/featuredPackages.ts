export interface FeaturedPackage {
  id: string;
  tier: 'PREMIUM' | 'ENTERPRISE';
  title: string;
  description: string;
  cta: string;
  image?: string;
}

import featuredData from './featuredPackages.json';
export const featuredPackages: FeaturedPackage[] = (featuredData as any).featuredPackages as FeaturedPackage[];
