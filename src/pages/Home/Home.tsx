import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import FilterTabs from 'src/components/filters/FilterTabs';
import {RootState} from '../../store/store';

interface name {
  value: string | null
}

const Home = () =>{
  const user = useSelector((state:RootState) => state.user.user);

  const userName = user?.fullName;

  return (
    <Box>
      <WelcomeMessage name={userName? userName : ""}/>
      <FilterTabs />
    </Box>
  )
}

export default Home;
