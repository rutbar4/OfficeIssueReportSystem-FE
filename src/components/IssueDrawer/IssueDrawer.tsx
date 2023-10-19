import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerToolbar from './DrawerToolbar';

export default function IssueDrawer({ wrapperSetDaitailsOpen, issueDetailsOpen }) {
  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={issueDetailsOpen} onClose={() => wrapperSetDaitailsOpen(false)}>
          <DrawerToolbar wrapperSetDaitailsOpen={wrapperSetDaitailsOpen} />
          <Box sx={{ width: 250 }}></Box>;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
