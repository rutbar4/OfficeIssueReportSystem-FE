import axios from 'axios';

import { VoteModel } from 'src/models/VoteModel';
import { EXTERNAL_LINKS } from '../values/externalLinks';
import { user } from 'src/reducers/signIn/authReducer';

console.log('user');
console.log(user);
const vote = EXTERNAL_LINKS.voteApi;
export const emptyVote: VoteModel = {
  isVoted: false,
};

export async function IsVoted(issueId: string) {
  try {
    const response = await axios.get(`${vote}/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + user.jwt,
      },
    });
    return response.data.isVoted;
  } catch (error) {
    console.log('Failed to fetch issue details');
  }
}

export async function GetVoteCount(issueId) {
  try {
    const response = await axios.get(`${vote}/count/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + user.jwt,
      },
    });
    return response.data.count;
  } catch (error) {
    console.log('Failed to fetch  issue count');
  }
}

export async function PostVote(issueId) {
  try {
    const response = await axios.post(`${vote}/${issueId}`, null, {
      headers: {
        Authorization: 'Bearer ' + user.jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Failed to create a vote for the issue: ${issueId}`);
  }
}

export async function DeleteVote(issueId) {
  try {
    const response = await axios.delete(`${vote}/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + user.jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Failed to delete issue vote');
  }
}
