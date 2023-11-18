
import HTTP from './index';

import { Country } from 'src/models/AddressModel';


export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await HTTP.get('/country');
    return response.data;
  } catch (error) {
    return [];
  }
};
