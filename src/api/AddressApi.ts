import axios from 'axios';

import { Address } from 'src/models/AddressModel';

export const fetchAllAddresses = async (): Promise<Address[]> => {
  try {
    const response = await axios.get<Address[]>('http://localhost:8080/address');
    return response.data;
  } catch (error) {
    return [];
  }
};
