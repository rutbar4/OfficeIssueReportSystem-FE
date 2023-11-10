import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import IssueCard from 'src/components/Issue';
import {getAllIssues} from '../../api/issueAPI';
import {getIssues, Issue} from '../../store/slices/issueSlice';
import {CircularProgress} from '@mui/material';
import {RootState} from '../../store/store';

interface name {
  value: string | null
}

const Home = () =>{

  const [issues, setIssues] = useState<Issue[]>([])
  const [loading , setLoading] = useState(true)
  const user = useSelector((state:RootState) => state.user.user);

  const userName = user?.fullName;

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();


  useEffect(()=>{
    getAllIssues()
      .then(({data}) => {
        setIssues(data);
        dispatch(getIssues(data))
      })
      .catch((err)=>console.log(err))
      .finally(()=>setLoading(false))
  }, []);

  return (
    <Box>
      <WelcomeMessage name={userName? userName : ""}/>
      {loading ? <CircularProgress/> : <div>
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issueId={issue.id}
            issueName={issue.name}
            issueDescription={issue.description}
            issueStatus={issue.status}
            upvoteCount={issue.upvoteCount}
            commentCount={issue.commentCount}
            date={issue.time}
          />
        ))}
      </div>}
    </Box>
  )
}

export default Home;
