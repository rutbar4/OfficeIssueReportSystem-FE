
import HTTP from './index';
import { Comment } from '../components/comment/Comment';


const getAllCommentsApi = (issueId: string) => HTTP.get<Comment[]>(`/comment/issue-id/${issueId}`)
  .then(response => response.data);

const updateCommentApi = (id: string, issueId: string, votes: number) =>
  HTTP.patch<Comment>(`/comment/${id}/issue/${issueId}votes/${votes}`, null)
  .then(response => response.data);

const createCommentApi = (data: Comment) => HTTP.post<Comment>('/comment', data)
  .then(response => response.data);

export {
  getAllCommentsApi,
  updateCommentApi,
  createCommentApi
};



