import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function IssueDrawer({ wrapperSetDaitailsOpen, openState }) {
  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={openState} onClose={() => wrapperSetDaitailsOpen(false)}>
          <Box sx={{ width: 250 }}></Box>;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
