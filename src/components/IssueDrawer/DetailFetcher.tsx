import axios from 'axios';

export async function fetchIssueDetails(id: string) {
  try {
    const response = await axios.get(`http://localhost:8080/issue/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch issue details in src/components/IssueDrawer/DetailFetcher.tsx');
  }
}