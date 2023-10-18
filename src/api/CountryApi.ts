import axios from 'axios';

import { Country } from 'src/models/AddressModel';

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>('http://localhost:8080/country');
    return response.data;
  } catch (error) {
    return [];
  }
};
