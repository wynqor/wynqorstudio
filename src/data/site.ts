import siteData from './site.json';
const base = (siteData as any);
export const site = {
  name: base.name as string,
  companyEmail: (import.meta as any).env?.VITE_COMPANY_EMAIL || (base.companyEmail as string),
  phone: base.phone as string,
  location: base.location as string,
  socials: base.socials as Record<string, string>,
};
