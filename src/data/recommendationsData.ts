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

const buildPopularFeaturedIds = (): string[] => {
  const featured = services.filter(s => s.isTrending || s.isBestseller);
  const buckets = new Map<string, typeof featured>();
  featured.forEach(s => {
    const arr = buckets.get(s.category) || [];
    arr.push(s);
    buckets.set(s.category, arr);
  });
  // sort each bucket by rating desc
  for (const arr of buckets.values()) {
    arr.sort((a, b) => byRatingDesc(a.rating, b.rating));
  }
  const ids: string[] = [];
  const categories = [...buckets.keys()];
  let round = 0;
  while (ids.length < 10 && buckets.size > 0) {
    for (const cat of categories) {
      const arr = buckets.get(cat);
      if (!arr || arr.length === 0) continue;
      if (round < arr.length) {
        const pick = arr[round];
        if (pick && !ids.includes(pick.id)) {
          ids.push(pick.id);
          if (ids.length === 10) break;
        }
      }
    }
    round++;
    if (round > 50) break; // safety
    // break if nothing left
    const remaining = categories.some(cat => (buckets.get(cat)?.length || 0) > round);
    if (!remaining) break;
  }
  // if still less than 10, fill by top rated featured
  if (ids.length < 10) {
    const more = featured
      .sort((a, b) => byRatingDesc(a.rating, b.rating))
      .map(s => s.id)
      .filter(id => !ids.includes(id))
      .slice(0, 10 - ids.length);
    ids.push(...more);
  }
  return ids.slice(0, 10);
};

export const popularFeaturedIds: string[] = buildPopularFeaturedIds();
