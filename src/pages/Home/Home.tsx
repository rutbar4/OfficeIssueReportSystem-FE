import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import IssueCard from 'src/components/IssueCard/Issue';
import {RootState} from '../../store/store';

import FilterTabs from 'src/components/filters/FilterTabs';


interface name {
  value: string | null
}

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
