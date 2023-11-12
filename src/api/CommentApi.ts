import axios from 'axios';

import HTTP from './index';
import { Comment } from '../components/comment/Comment';




export const getAllCommentsApi = async(issueId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(`http://localhost:9090/comment/issue-id/${issueId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateCommentApi = async (id: string, issueId: string, votes: number): Promise<Comment> => {
  try {
  const response = await axios.patch<Comment>(`http://localhost:9090/comment/${id}/issue/${issueId}votes/${votes}`, null);
  return response.data;
  } catch (error) {
    return Promise.reject('Failed to update votes');
  }
};

export const createCommentApi = async (data: Comment): Promise<Comment> => {
  try {
  const response = await axios.post<Comment>('http://localhost:9090/comment', data);
  return response.data;
  } catch (error) {
    return Promise.reject('Failed to create comment');
  }
};

