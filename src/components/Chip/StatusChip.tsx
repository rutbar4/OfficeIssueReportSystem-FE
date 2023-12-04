import React from 'react';
import Chip from '@mui/material/Chip';

import { COLORS } from 'src/values/colors.js';

const StatusChip = ({ issueStatus }: { issueStatus: string }) => {
  return (
    <Chip
      label={issueStatus}
      sx={{ borderRadius: '17px', fontSize: '14px', height: '28px' }}
      style={{
        backgroundColor:
          issueStatus === 'Open'
            ? '#CFE7D7'
            : issueStatus === 'In progress'
            ? '#DAE9FF'
            : issueStatus === 'Pending'
            ? '#FFF7DA'
            : issueStatus === 'Blocked'
            ? '#FFDAE3'
            : '#EDEFF1',
        color:
          issueStatus === 'Open'
            ? COLORS.blue
            : issueStatus === 'In progress'
            ? COLORS.blue
            : issueStatus === 'Pending'
            ? COLORS.blue
            : issueStatus === 'Blocked'
            ? COLORS.blue
            : '#A9A9AA',
      }}
    />
  );
};

export default StatusChip;
