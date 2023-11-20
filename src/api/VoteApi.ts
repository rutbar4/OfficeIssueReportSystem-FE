import { VoteModel } from 'src/models/VoteModel';
import store from '../store/store';
import HTTP from '.';

export const emptyVote: VoteModel = {
  isVoted: false,
};

export async function IsVoted(issueId: string) {
  try {
    const response = await HTTP.get(`/vote/${issueId}`);
    return response.data.isVoted;
  } catch (error) {
    // reikia kad mygtukas irgi sureaguotu kai nepavyko -nepasispaudti ir išmesti alertą
    throw new Error('Failed to fetch issue details');
  }
}
export async function GetVoteCount(issueId) {
  try {
    const response = await HTTP.get(`/vote/count/${issueId}`);
    return response.data.count;
  } catch (error) {
    throw new Error('Failed to fetch  issue count');
  }
}

export async function PostVote(issueId) {
  try {
    const response = await HTTP.post(`/vote/${issueId}`, null);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create a vote for the issue: ${issueId}`);
  }
}

export async function DeleteVote(issueId) {
  try {
    const response = await HTTP.delete(`/vote/${issueId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete issue vote');
  }
}
