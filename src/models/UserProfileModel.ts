import { Address, Country } from './AddressModel';
import { Office } from './OfficeModel';

export interface UserProfileModel {
  id : string;
  fullName: string;
  department: Office;
  role: string;
  address: Address;
  country: Country;
  avatar: Picture;
}


export interface Picture {
  link: string;
}

