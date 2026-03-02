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
import overrides from './services.overrides.json';
import categoriesData from './categories.json';
const collectOverrideRecords = (): Array<{ id: string; data: any }> => {
  const raw: any = overrides;
  const recs: Array<{ id: string; data: any }> = [];
  if (raw && Array.isArray(raw.services)) {
    raw.services.forEach((entry: any) => {
      if (entry && typeof entry === 'object') {
        Object.entries(entry).forEach(([id, data]) => {
          recs.push({ id, data });
        });
      }
    });
    return recs;
  }
  if (Array.isArray(raw)) {
    raw.forEach((item: any) => {
      if (item && typeof item === 'object') {
        if (item.id) recs.push({ id: item.id, data: item });
        else Object.entries(item).forEach(([id, data]) => recs.push({ id, data }));
      }
    });
    return recs;
  }
  if (raw && typeof raw === 'object') {
    Object.entries(raw as Record<string, any>).forEach(([id, data]) => {
      if (id !== 'services') recs.push({ id, data });
    });
  }
  return recs;
};
const normalizeOverrideFields = (data: any): Partial<Service> => {
  const img = typeof data.image === 'string' ? (data.image as string).replace(/`/g, '').trim() : undefined;
  const ratingVal =
    typeof data.rating === 'number'
      ? data.rating.toFixed(1)
      : typeof data.rating === 'string'
      ? data.rating
      : undefined;
  const durationVal = data.duration ?? data.deliveryTime ?? undefined;
  const fields: Partial<Service> = {};
  if (data.title) fields.title = data.title;
  if (data.category) fields.category = data.category;
  if (data.price) fields.price = data.price;
  if (durationVal) fields.duration = durationVal;
  if (ratingVal) fields.rating = ratingVal;
  if (img) fields.image = img;
  if (typeof data.isBestseller === 'boolean') fields.isBestseller = data.isBestseller;
  if (typeof data.favorite === 'boolean' && data.favorite) fields.isTrending = true;
  if (typeof data.isTrending === 'boolean') fields.isTrending = data.isTrending;
  if (typeof data.reviewCount === 'number') fields.reviewCount = data.reviewCount;
  return fields;
};
const overrideRecords = collectOverrideRecords();
// (maps removed; building directly from overrideRecords to avoid unused symbols)

export const categories: Category[] = (categoriesData as any).categories as Category[];

const buildServices = (includeHidden = false): Service[] => {
  const list: Service[] = [];
  overrideRecords.forEach(({ id, data }) => {
    const isShow = (typeof data.isShow === 'boolean') ? !!data.isShow : true;
    if (!includeHidden && isShow === false) return;
    const f = normalizeOverrideFields(data);
    if (!f.title || !f.category || !f.price || !f.duration || !f.rating || !f.image) return;
    list.push({
      id,
      title: f.title,
      category: f.category,
      price: f.price,
      duration: f.duration,
      rating: f.rating,
      image: f.image,
      isBestseller: f.isBestseller,
      isTrending: f.isTrending,
      reviewCount: f.reviewCount
    });
  });
  return list;
};

const allServicesIncludingHiddenInternal: Service[] = buildServices(true);
export const services: Service[] = buildServices(false);
export const allServicesIncludingHidden: Service[] = allServicesIncludingHiddenInternal;

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
