import axios from 'axios';

import { Comment } from '../components/comment/Comment';

export const getAllCommentsApi = async(): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>('http://localhost:8080/comment');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateCommentApi = async (data: Comment): Promise<number> => {
  const response = await axios.put<Comment>('http://localhost:8080/comment}', data);
  return response.status;
};

export const createCommentApi = async (data: Comment): Promise<Comment> => {
  const response = await axios.post<Comment>('http://localhost:8080/comment}', data);
  return response.data;
};
