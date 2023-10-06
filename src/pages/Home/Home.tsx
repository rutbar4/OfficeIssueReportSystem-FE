import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Home = () => {
  const [name, setName] = useState('Diana');

  return (
    <Box>
      <WelcomeMessage name={name} />
    </Box>
  );
};

export default Home;
