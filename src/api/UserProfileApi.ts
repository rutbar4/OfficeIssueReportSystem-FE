import axios from 'axios';

import { UserProfileModel } from 'src/models/UserProfileModel';


export const fetchUserProfile = async (): Promise<UserProfileModel> => {
  return await axios.get<UserProfileModel>('http://localhost:8080/user')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

