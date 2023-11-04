import HTTP from './index';

const login =(data)=> HTTP.put('/login', data);

export {login}
