
import HTTP from './index';
import { Comment } from '../components/comment/Comment';


const getAllCommentsApi = (issueId: string) => HTTP.get<Comment[]>(`http://localhost:9090/comment/issue-id/${issueId}`)
  .then(response => response.data);

const updateCommentApi = (id: string, issueId: string, votes: number) =>
  HTTP.patch<Comment>(`http://localhost:9090/comment/${id}/issue/${issueId}votes/${votes}`, null)
  .then(response => response.data);

const createCommentApi = (data: Comment) => HTTP.post<Comment>('http://localhost:9090/comment', data)
  .then(response => response.data);

export {
  getAllCommentsApi,
  updateCommentApi,
  createCommentApi
};



