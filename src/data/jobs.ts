export interface JobRole {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  description?: string;
  applyUrl?: string;
}

import jobsData from './jobs.json';
export const jobs: JobRole[] = (jobsData as any).jobs as JobRole[];
