import axios from 'axios';

import { Office } from 'src/models/OfficeModel';

export const fetchAllOffices = async (): Promise<Office[]> => {
  try {
    const response = await axios.get<Office[]>('http://localhost:8080/office');
    return response.data;
  } catch (error) {
    return [];
  }
};
