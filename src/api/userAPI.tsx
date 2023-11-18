import HTTP from './index';

const login =(data)=> HTTP.post('/login', data);

export {login};
