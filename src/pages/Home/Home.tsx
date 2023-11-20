import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import {RootState} from '../../store/store';

import FilterTabs from 'src/components/filters/FilterTabs';

const Home = () =>{
  const user = useSelector((state:RootState) => state.user.user);

  const userName = user?.fullName;

  return (
    <Box>
      <WelcomeMessage name={userName? userName : ''}/>
      <FilterTabs />
    </Box>
  );
};

export default Home;
