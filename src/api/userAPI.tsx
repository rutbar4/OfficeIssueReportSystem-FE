import HTTP from './index';

const login = (data) => HTTP.post('/login', data);
const updateUser = (userId, data) => HTTP.put(`user/${userId}/update`, data);

export {login, updateUser};
