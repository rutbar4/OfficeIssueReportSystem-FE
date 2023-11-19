import HTTP from './index';

import { UserProfileModel } from 'src/models/UserProfileModel';



export const emptyUserProfile: UserProfileModel = {
    id: '',
    fullName: '',
    role: '',
    department: {
      officeName: '',
    },
    address: {
      street: '',
      city: '',
      state: '',
      postcode: '',
    },
    country: {
      countryName: '',
    },
    picture: {
      link: '',
    }
  };


export const fetchUserProfile = async (): Promise<UserProfileModel> => {
  return await HTTP.get<UserProfileModel>('/user')
    .then((response) => response.data)
    .catch(() => {
      return emptyUserProfile;
    });
};


export const updateUserProfile = async (data: UserProfileModel): Promise<number> => {
  const response = await HTTP.put<UserProfileModel>(`/user/${data.id}`, data);
  return response.status;
};






