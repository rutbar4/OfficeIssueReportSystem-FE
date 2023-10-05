import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

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
    </Box>
  );
};

export default Home;
