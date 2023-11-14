
import HTTP from './index';

import { AddComment, Comment } from 'src/models/CommentModel';


const getAllCommentsApi = (issueId: string) => HTTP.get<Comment[]>(`/comment/issue-id/${issueId}`)
  .then(response => response.data);


const updateCommentApi = (id: string, issueId: string, votes: number) =>
  HTTP.patch<Comment>(`/comment/${id}/issue/${issueId}/votes/${votes}`, null)
  .then(response => response.data);


const createCommentApi = (data: AddComment) => {
  const formattedTime = `${data.time.getFullYear()}-${(data.time.getMonth() + 1)
    .toString().padStart(2, '0')}-${data.time.getDate().toString()
    .padStart(2, '0')} ${data.time.getHours().toString()
    .padStart(2, '0')}:${data.time.getMinutes().toString()
    .padStart(2, '0')}:${data.time.getSeconds().toString().padStart(2, '0')}`;
  const payload = {
    text: data.text,
    time: formattedTime,
    votes: data.votes,
    parentId: data.parentId,
    issueId: data.issueId,
    employeeId: data.employeeId,
  };
  return HTTP.post<Comment>('/comment', payload)
    .then(response => response.data);
};


export {
  getAllCommentsApi,
  updateCommentApi,
  createCommentApi
};



