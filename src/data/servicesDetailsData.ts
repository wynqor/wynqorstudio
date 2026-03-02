export interface ServiceDetailsContent {
  id: string;
  description: string;
  whyChoose: string;
  process: string[];
  features: string[];
  relatedServices: string[];
}

import overrides from './services.overrides.json';

const collectDetailsOverrideRecords = (): Array<{ id: string; data: any }> => {
  const raw: any = overrides;
  const out: Array<{ id: string; data: any }> = [];
  if (raw && Array.isArray(raw.services)) {
    raw.services.forEach((entry: any) => {
      if (entry && typeof entry === 'object') {
        Object.entries(entry).forEach(([id, data]) => out.push({ id, data }));
      }
    });
    return out;
  }
  if (Array.isArray(raw)) {
    raw.forEach((item: any) => {
      if (item && typeof item === 'object') {
        if (item.id) out.push({ id: item.id, data: item });
        else Object.entries(item).forEach(([id, data]) => out.push({ id, data }));
      }
    });
    return out;
  }
  if (raw && typeof raw === 'object') {
    Object.entries(raw as Record<string, any>).forEach(([id, data]) => {
      if (id !== 'services') out.push({ id, data });
    });
  }
  return out;
};

const detailsOverrideRecords = collectDetailsOverrideRecords();

export const getServiceDetails = (serviceId: string): ServiceDetailsContent | undefined => {
  const rec = detailsOverrideRecords.find(r => r.id === serviceId);
  const o = rec?.data;
  if (!o) return undefined;
  const d = o.details || {};
  const description = o.description ?? d.description;
  const whyChoose = o.whyChoose ?? d.whyChoose;
  const process = o.process ?? d.process;
  const features = o.features ?? d.features;
  const relatedServices = o.relatedServices ?? d.relatedServices;
  if (
    description === undefined &&
    whyChoose === undefined &&
    (process === undefined || !Array.isArray(process)) &&
    (features === undefined || !Array.isArray(features))
  ) {
    return undefined;
  }
  return {
    id: serviceId,
    description: description ?? '',
    whyChoose: whyChoose ?? '',
    process: Array.isArray(process) ? process : [],
    features: Array.isArray(features) ? features : [],
    relatedServices: Array.isArray(relatedServices) ? relatedServices : []
  };
};
