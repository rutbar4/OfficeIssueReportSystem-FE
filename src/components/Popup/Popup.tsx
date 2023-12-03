
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { Grid } from '@mui/material';

import { COLORS } from '../../values/colors';

type PopupProps = {
  onContinue: () => void;
  show: boolean;
};

const Popup: React.FC<PopupProps> = ({ onContinue, show }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 30));
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
            <h5>{`Session expires in ${countdown} seconds. Do you want to continue?`}</h5>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleContinue}
              style={{
                width: '40%',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>,
        document.body
      )
    : null;
};

export default Popup;

