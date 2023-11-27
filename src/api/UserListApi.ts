import HTTP from './index';

import { User } from 'src/models/BasicUserModel';

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await HTTP.get<User[]>('/user/all');
    return response.data;
  } catch (error) {
    return [];
  }
};
