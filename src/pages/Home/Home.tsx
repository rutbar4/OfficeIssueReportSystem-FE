import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import IssueCard from 'src/components/Issue'
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Home = () => {
  const [name, setName] = useState('Diana');

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
      <IssueCard
        issueName="Example Issue"
        issueDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        issueStatus="Open"
        upvoteCount={10}
        commentCount={5}
        date={new Date().toLocaleDateString()}
      />
    </Box>
  );
};

export default Home;
