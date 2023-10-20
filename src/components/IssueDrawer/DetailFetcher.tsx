import axios from 'axios';

interface IssueDetails {
  id: string;
}

export async function fetchIssueDetails(id: string) {
  const response = await axios.get(`http://localhost:8080/issue/${id}`);
  return response.data;
}