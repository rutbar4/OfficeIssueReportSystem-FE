import HTTP from './index';

export async function deleteIssueById(id: string) {
  try {
    const response = await HTTP.delete(`/issue/${id}`);
    return response.data;
  } catch (error) {
    console.log('Failed to delete the issue in src/components/IssueDrawer/DeleteIssue.tsx');
    throw error;
  }
}
