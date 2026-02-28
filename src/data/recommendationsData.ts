export interface Recommendation {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  price: string;
}

import { services } from './servicesData';

const byRatingDesc = (a: string, b: string) => parseFloat(b) - parseFloat(a);
const uniqueById = <T extends { id: string }>(arr: T[]) => {
  const seen = new Set<string>();
  return arr.filter(({ id }) => (seen.has(id) ? false : (seen.add(id), true)));
};

const buildRecommendations = (): Recommendation[] => {
  const sorted = [...services].sort((a, b) => byRatingDesc(a.rating, b.rating));
  const highlighted = services.filter(s => s.isTrending || s.isBestseller);
  const combined = uniqueById([...highlighted, ...sorted]).slice(0, 6);
  return combined.map(s => ({
    id: s.id,
    image: s.image,
    category: s.category,
    title: s.title,
    description: `${s.title} in ${s.category}`,
    price: s.price
  }));
};

export const recommendationsData: Recommendation[] = buildRecommendations();
