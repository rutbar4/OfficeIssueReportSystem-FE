import HTTP from './index';
const saveIssue =(issue)=> HTTP.post('/issue', issue);
const getIssueById = (issueId) => HTTP.get(`/issue/${issueId}`);
const getAllIssues = () => HTTP.get('issue');
const updateIssue =(issue, issueId) => HTTP.put(`/issue/${issueId}`, issue)
const deleteIssue = (issueId) => HTTP.delete(`/issue/${issueId}`)

export {
  saveIssue,
  getIssueById,
  getAllIssues,
  deleteIssue
}
