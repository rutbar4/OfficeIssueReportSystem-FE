import axios from 'axios';

export const fetchData = async (): Promise<string[]> => {
  const response = await axios.get<string[]>('http://localhost:8080/data');

  return response.data;
};
