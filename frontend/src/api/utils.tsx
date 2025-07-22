import type { API_ENDPOINTS } from '@/api/api-endpoints.enum.ts';

export const generateDynamicPath = (endpoint: API_ENDPOINTS, id: any) => {
  return endpoint.replace(':id', `${id}`);
};
