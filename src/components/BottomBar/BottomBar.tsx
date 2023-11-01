import React from 'react';
import 'src/scss/BottomBarStyles.scss';
import { Box, Link, Typography } from '@mui/material';

import { COLORS } from 'src/values/colors.js';

const BottomBar: React.FC = () => {
  const privacyPolicy = 'https://www.cognizant.com/us/en/privacy-notice';
  return (
    <Box
      className="bottom-bar"
      display="flex"
      alignItems="center"
      p={2}
      style={{ paddingLeft: '180px', paddingRight: '100px' }}
    >
      <Box>
        <Typography variant="h6">Copyright © {new Date().getFullYear()} Cognizant</Typography>
      </Box>
      <Box ml="auto">
        <Link variant="h6" href={privacyPolicy} underline="hover" color={COLORS.lighterGray}>
          Privacy policy
        </Link>
      </Box>
    </Box>
  );
};

export default BottomBar;
