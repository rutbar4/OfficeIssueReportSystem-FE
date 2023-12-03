
import { useDispatch } from 'react-redux';

import HTTP from './index';

import { addUser } from 'src/store/slices/userSlice';
import store from 'src/store/store';

type RefreshToken = {
  jwt: string,
}

const RefreshTokenApi = async (dispatch): Promise<RefreshToken> => {
  const user = store.getState().user.user;
  try {
    const response = await HTTP.post<RefreshToken>('refresh');
    const jwt: RefreshToken = response.data;
    dispatch(
      addUser({
        user: user,
        jwt: jwt.jwt,
      })
    );
    return jwt;
  } catch (error) {
    console.error('Error refreshing JWT token: ', error);
    throw error;
  }
};

export default RefreshTokenApi;


