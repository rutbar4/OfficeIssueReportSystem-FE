import axios from 'axios';

export async function deleteIssueById(id: string) {
  try {
    const response = await axios.delete(`http://localhost:8080/issue/${id}`);
    return response.data;
  } catch (error) {
    console.log('Failed to delete the issue in src/components/IssueDrawer/DeleteIssue.tsx');
    throw error;
  }
}
