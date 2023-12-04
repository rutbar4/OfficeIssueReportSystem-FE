
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { Grid } from '@mui/material';
import { Navigate } from 'react-router';

import { COLORS } from '../../values/colors';
import StyledButton from '../StyledButton/StyledButton';

import { removeUser } from 'src/store/slices/userSlice';
import { logOutUser } from 'src/store/slices/authenticationSlice';
import { AppRoutes } from 'src/types/routes';


type PopupProps = {
  onContinue: () => void;
  show: boolean;
};

const Popup: React.FC<PopupProps> = ({ onContinue, show }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          dispatch(removeUser());
          dispatch(logOutUser());
          <Navigate to={AppRoutes.SIGN_IN} />;
          clearInterval(countdownTimer);
          return prevCountdown;
        }
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const handleContinue = () => {
    clearInterval(30);
    onContinue();
  };

  return show
    ? ReactDOM.createPortal(
      <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2001,
      }}
      >
      <Box
        sx={{
          background: 'white',
          padding: 2,
          borderRadius: 12,
          textAlign: 'center',
          color: COLORS.blue,
          fontSize: 20,
          fontFamily: 'Helvetica',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4>{`Session expires in ${countdown} seconds. Do you want to continue?`}</h4>
          </Grid>
          <Grid item xs={12} style={{marginBottom: '16px'}}>
            <StyledButton buttonType='primary' buttonSize='large' type='button' onClick={handleContinue}>
              Continue
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
    </Box>,
        document.body
      )
    : null;
};

export default Popup;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

