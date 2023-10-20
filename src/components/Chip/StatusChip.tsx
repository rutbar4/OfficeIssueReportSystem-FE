import React from 'react';
import Chip from '@mui/material/Chip';

const StatusChip = ({ issueStatus }: { issueStatus: string }) => {
    return (
        <Chip
            label={issueStatus}
            sx={{ borderRadius: '17px', fontSize: '15px' }}
            color={
                issueStatus === 'Open' || issueStatus === 'open'
                    ? 'success'
                    : issueStatus === 'In progress' || issueStatus === 'in progress'
                    ? 'primary'
                    : 'default'
            }
        />
    );
};

export default StatusChip;
