import HTTP from './index';

export async function fetchIssueDetails(id: string) {
  try {
    const response = await HTTP.get(`/issue/${id}`);
    return response.data;
  } catch (error) {
    console.log('Failed to fetch issue details in src/components/IssueDrawer/DetailFetcher.tsx');
  }
}
