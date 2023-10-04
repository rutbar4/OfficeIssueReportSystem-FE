import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Home = () => {

  return (
    <Box>
      <Typography
        variant="h4"
        noWrap
        sx={{
          mt: 2,
          mb: 2,
        }}
      >
        Hello World!
      </Typography>
      <WelcomeMessage name ='Diana'/>

    </Box>
  );
};

export default Home;
