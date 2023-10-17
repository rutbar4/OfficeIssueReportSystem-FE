import axios from 'axios';

import { Address, Country } from 'src/models/AddressModel';
import { Office } from 'src/models/OfficeModel';
import { UserProfileModel } from 'src/models/UserProfileModel';


export const fetchUserProfile = async (): Promise<UserProfileModel> => {
  return await axios.get<UserProfileModel>('http://localhost:8080/user')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};


export const updateUserProfile = async (data: UserProfileModel): Promise<number> => {
  const response = await axios.put<UserProfileModel>(`http://localhost:8080/user/${data.id}`, data);
  return response.status;
};

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>('http://localhost:8080/country');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchAllAddresses = async (): Promise<Address[]> => {
  try {
    const response = await axios.get<Address[]>('http://localhost:8080/address');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchAllOfficies = async (): Promise<Office[]> => {
  try {
    const response = await axios.get<Office[]>('http://localhost:8080/office');
    return response.data;
  } catch (error) {
    return [];
  }
};

