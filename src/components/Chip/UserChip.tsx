import React from 'react';
import Chip from '@mui/material/Chip';

import { COLORS } from 'src/values/colors.js';

const UserChip = ({ imageLink, userName }: { imageLink: string; userName: string }) => {
  return (
    <Chip
      label={userName}
      avatar={<img src={imageLink} alt={userName} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />}
      sx={{ borderRadius: '17px', fontSize: '16px', color: COLORS.blue, backgroundColor: '#F4F4F4' }}
    />
  );
};

export default UserChip;
