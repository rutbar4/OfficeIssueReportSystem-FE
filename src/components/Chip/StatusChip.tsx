import React from 'react';
import Chip from '@mui/material/Chip';

const StatusChip = ({ issueStatus }: { issueStatus: string }) => {
  return (
    <Chip
      label={issueStatus}
      sx={{ borderRadius: '17px', fontSize: '15px' }}
      color={
        issueStatus === 'Open'
          ? 'success'
          : issueStatus === 'In progress'
          ? 'primary'
          : issueStatus === 'Blocked'
          ? 'error'
          : 'default'
      }
    />
  );
};

export default StatusChip;
