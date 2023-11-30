import HTTP from './index';

const login = (data) => HTTP.post('/login', data);
const updateUser = (data) => HTTP.put('/user/update', data);
const getUserDetails = (userId) => HTTP.get(`/issue/${userId}`);

export {login, updateUser, getUserDetails};
