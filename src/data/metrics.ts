export interface Metric {
  id: string;
  label: string;
  value: string;
}
import metricsData from './metrics.json';
export const metrics: Metric[] = (metricsData as any).metrics as Metric[];
