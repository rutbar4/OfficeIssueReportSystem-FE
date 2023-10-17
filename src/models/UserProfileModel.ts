import { Address, Country } from './AddressModel';
import { Office } from './OfficeModel';

export interface UserProfileModel {
  id?: string;
  fullName: string;
  department: Office;
  role: string;
  address: Address;
  country: Country;
  picture: Picture;
}


export interface Picture {
  id?: string;
  link: string;
}

