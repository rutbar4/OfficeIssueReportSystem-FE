import axios from 'axios';

import { VoteModel } from 'src/models/VoteModel';


export const emptyVote: VoteModel = {
    isVoted: false,
  };

export async function IsVoted(issueId: string, userId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/vote/${issueId}/${userId}`);
      return response.data;
    } catch (error) {
      console.log('Failed to fetch issue details in src/components/IssueDrawer/DetailFetcher.tsx');
    }
  }
  
export const getVoteCount= async (): Promise<VoteModel> => {
    return await axios.get<VoteModel>('http://localhost:8080/vote/count/${issueId}')
      .then((response) => response.data)
      .catch(() => {
        return emptyVote;
      });
  };

// export const updateVote = async (data: VoteModel): Promise<number> => {
//   const response = await axios.put<VoteModel>(`http://localhost:8080/vote/${data.id}`, data);
//   return response.status;
// };






