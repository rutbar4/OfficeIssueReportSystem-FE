import axios from 'axios';

import { VoteModel } from 'src/models/VoteModel';
import { EXTERNAL_LINKS } from '../values/externalLinks';
import store from '../store/store';

const vote = EXTERNAL_LINKS.voteApi;
export const emptyVote: VoteModel = {
  isVoted: false,
};

export async function IsVoted(issueId: string) {
  try {
    let jwt = store.getState().user.jwtToken;
    const response = await axios.get(`${vote}/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });
    return response.data.isVoted;
  } catch (error) {
    // reikia kad mygtukas irgi sureaguotu kai nepavyko -nepasispaudti ir išmesti alertą
    console.log('Failed to fetch issue details');
  }
}
//GIT username check
export async function GetVoteCount(issueId) {
  try {
    let jwt = store.getState().user.jwtToken;
    const response = await axios.get(`${vote}/count/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });
    return response.data.count;
  } catch (error) {
    console.log('Failed to fetch  issue count');
  }
}

export async function PostVote(issueId) {
  try {
    let jwt = store.getState().user.jwtToken;
    const response = await axios.post(`${vote}/${issueId}`, null, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Failed to create a vote for the issue: ${issueId}`);
  }
}

export async function DeleteVote(issueId) {
  try {
    let jwt = store.getState().user.jwtToken;
    const response = await axios.delete(`${vote}/${issueId}`, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Failed to delete issue vote');
  }
}
