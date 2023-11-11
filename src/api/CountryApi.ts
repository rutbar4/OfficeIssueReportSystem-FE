import axios from 'axios';

import { Country } from 'src/models/AddressModel';
import HTTP from './index';

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await HTTP.get('/country');
    return response.data;
  } catch (error) {
    return [];
  }
};
