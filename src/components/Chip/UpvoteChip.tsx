import React from 'react';
import Chip from '@mui/material/Chip';

import Icon from 'src/icons/UpvoteIcon.png';

const UpvoteChip = ({ count }: { count: number}) => {
    return (
        <Chip
            label={count}
            avatar={<img src={Icon} alt={'Upvote Count'} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />}
            sx={{ borderRadius: '17px', fontSize: '17px' }}
        />
    );
};

export default UpvoteChip;
