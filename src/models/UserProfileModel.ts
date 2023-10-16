import { Address, Country } from './AddressModel';

export interface UserProfileModel {
  id?: string;
  fullName: string;
  department: string;
  role: string;
  address: Address;
  country: Country;
}

