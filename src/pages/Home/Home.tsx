import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import FilterTabs from 'src/components/filters/FilterTabs';


const Home = () => {
  const [name, setName] = useState('Diana');

  return (
    <Box>
      <WelcomeMessage name={name}/>
      <FilterTabs />
    </Box>

  );
};

export default Home;
