import axios from 'axios';

import { VoteModel } from 'src/models/VoteModel';

export const emptyVote: VoteModel = {
  isVoted: false,
};

export async function IsVoted(issueId: string, userId: string) {
  try {
    const response = await axios.get(`http://localhost:8080/vote/${issueId}/${userId}`);
    return response.data.isVoted;
  } catch (error) {
    console.log('Failed to fetch issue details');
  }
}

export async function GetVoteCount(issueId) {
  try {
    const response = await axios.get(`http://localhost:8080/vote/count/${issueId}`);
    return response.data.count;
  } catch (error) {
    console.log('Failed to fetch issue count');
  }
}

export async function PostVote(issueId, userId) {
  try {
    const response = await axios.post(`http://localhost:8080/vote`, {
      issueId: issueId,
      employeeId: userId,
    });
    return response.data.count;
  } catch (error) {
    console.log('Failed to create a vote for the issue: ' + { issueId } + ' and userId: ' + { userId });
  }
}

export async function DeleteVote(issueId, userId) {
  try {
    const response = await axios.delete(`http://localhost:8080/vote/${issueId}/${userId}`);
    return response.data;
  } catch (error) {
    console.log('Failed to delete issue vote');
  }
}
