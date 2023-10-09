import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

import IssueCard from 'src/components/Issue';
import { RootState } from 'src/store/store';
import { getIssues } from 'src/actions/issues/IssuesAction';


const Home = () => {
  const [name, setName] = useState('Diana');
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const issues = useSelector((state: RootState) => state.issues);

  useEffect(() => {
    dispatch(getIssues());
  }, [dispatch]);

  return (
    <Box>
      <Typography
        variant="h4"
        noWrap
        sx={{
          mt: 2,
          mb: 2,
          paddingLeft: 2,
        }}
      >
        Hello World!
      </Typography>
      <WelcomeMessage name={name}/>
      {issues.loading ? (
        <p>Loading...</p>
      ): ( <div>
        {issues.issues.map((issue) => (
          <IssueCard
          key={issue.id}
          issueName={issue.name}
          issueDescription={issue.description}
          issueStatus={issue.status}
          upvoteCount={issue.upvoteCount}
          commentCount={issue.commentCount}
          date={issue.time}
          />
        ))}
      </div>
      )}
    </Box>
  );
};

export default Home;
