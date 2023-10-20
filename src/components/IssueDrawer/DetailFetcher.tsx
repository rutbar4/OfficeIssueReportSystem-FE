import axios from 'axios';

interface issueDetailsProps {
  id: string;
}

export async function fetchIssueDetails(props: issueDetailsProps) {
  const response = await axios.get(`http://localhost:8080/issue/${id}`);
  return response.data;
}