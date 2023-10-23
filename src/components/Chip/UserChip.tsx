import React from 'react';
import Chip from '@mui/material/Chip';

const UserChip = ({ imageLink, userName }: { imageLink: string, userName: string }) => {
    return (
        <Chip
            label={userName}
            avatar={<img src={imageLink} alt={userName} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />}
            sx={{ borderRadius: '17px', fontSize: '17px',color:'#0E166E' }}
        />
    );
};

export default UserChip;