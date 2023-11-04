const addToLocalStorage =(key, value)=> localStorage.setItem(key, JSON.stringify(value));
const getFromLocalStorage =(key)=> localStorage.getItem(key);
const  removeFromLocalStorage =(key)=> localStorage.removeItem(key);

export{addToLocalStorage, getFromLocalStorage, removeFromLocalStorage}
