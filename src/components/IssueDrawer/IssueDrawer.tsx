import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function IssueDrawer({ wrapperSetState, state }) {
  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={state} onClose={() => wrapperSetState(false)}>
          <Box sx={{ width: 250 }}></Box>;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
