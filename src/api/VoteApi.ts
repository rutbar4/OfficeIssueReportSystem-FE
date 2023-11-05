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
      console.log('Failed to fetch issue details in src/components/IssueDrawer/DetailFetcher.tsx');
    }
  }
  
  export async function getVoteCount(issueId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/vote/count/${issueId}`);
      return response.data;
    } catch (error) {
      console.log('Failed to fetch issue details in src/components/IssueDrawer/DetailFetcher.tsx');
    }
  }

// export const updateVote = async (data: VoteModel): Promise<number> => {
//   const response = await axios.put<VoteModel>(`http://localhost:8080/vote/${data.id}`, data);
//   return response.status;
// };






