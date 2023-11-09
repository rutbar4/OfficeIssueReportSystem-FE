import HTTP from './index';
const saveIssue =(issue)=> HTTP.post('/issue', issue);
const getIssueById = (issueId) => HTTP.get(`/issue/${issueId}`);
const getAllIssues = () => HTTP.get('/issue');
const updateIssueById =(issue, issueId) => HTTP.put(`/issue/${issueId}`, issue)
const deleteIssueById = (issueId) => HTTP.delete(`/issue/${issueId}`)

export {
  saveIssue,
  getIssueById,
  getAllIssues,
  deleteIssueById
}
