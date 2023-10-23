import axios from 'axios';

import { UserProfileModel } from 'src/models/UserProfileModel';


export const emptyUserProfile: UserProfileModel = {
    id: '',
    fullName: '',
    role: '',
    department: {
      id: '',
      officeName: '',
    },
    address: {
      id: '',
      street: '',
      city: '',
      state: '',
      postcode: '',
    },
    country: {
      id: '',
      countryName: '',
    },
    picture: {
      id: '',
      link: '',
    }
  };


export const fetchUserProfile = async (): Promise<UserProfileModel> => {
  return await axios.get<UserProfileModel>('http://localhost:8080/user')
    .then((response) => response.data)
    .catch(() => {
      return emptyUserProfile;
    });
};


export const updateUserProfile = async (data: UserProfileModel): Promise<number> => {
  const response = await axios.put<UserProfileModel>(`http://localhost:8080/user/${data.id}`, data);
  return response.status;
};






