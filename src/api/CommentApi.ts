import axios from 'axios';

import { Comment } from '../components/comment/Comment';

import { user } from 'src/reducers/signIn/authReducer';


export const getAllCommentsApi = async(issueId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(`http://localhost:9090/comment/issue-id/${issueId}` , {
      headers: {
        Authorization: 'Bearer ' + user.jwt,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateCommentApi = async (id: string, votes: number): Promise<Comment> => {
  try {
  const response = await axios.patch<Comment>(`http://localhost:9090/comment/${id}/votes/${votes}`, null , {
    headers: {
      Authorization: 'Bearer ' + user.jwt,
    },
  });
  return response.data;
  } catch (error) {
    return Promise.reject('Failed to update votes');
  }
};

export const createCommentApi = async (data: Comment): Promise<Comment> => {
  try {
  const response = await axios.post<Comment>('http://localhost:9090/comment', data, {
    headers: {
      Authorization: 'Bearer ' + user.jwt,
    },
  });
  return response.data;
  } catch (error) {
    return Promise.reject('Failed to create comment');
  }
};

