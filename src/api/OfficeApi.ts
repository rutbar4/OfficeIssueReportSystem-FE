import { Office } from 'src/models/OfficeModel';
import HTTP from './index';

export const fetchAllOffices = async (): Promise<Office[]> => {
  try {
    const response = await HTTP.get<Office[]>('/office');
    return response.data;
  } catch (error) {
    return [];
  }
};
