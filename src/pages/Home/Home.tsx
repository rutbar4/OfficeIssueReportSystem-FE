import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import IssueCard from 'src/components/Issue';
import { RootState } from 'src/store/store';
import {getAllIssues} from '../../api/issueAPI';
import {getIssues, Issue} from '../../store/slices/issueSlice';
import {CircularProgress} from '@mui/material';

const Home = () =>{

  const [issues, setIssues] = useState<Issue[]>([])
  const [loading , setLoading] = useState(true)
  const user = useSelector((state:RootState) => state.user);

  const [name, setName] = useState(user.userData?.fullName);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();


  useEffect(()=>{
    getAllIssues()
      .then(({data}) => {
        setIssues(data);
        dispatch(getIssues(data))
      })
      .catch((err)=>console.log(err))
      .finally()
  },[]);

  return (
    <Box>
      <WelcomeMessage name={name? name: "no name"}/>
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
