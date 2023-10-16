import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function IssueDrawer({ wrapperSetState, state }) {
  const list = () => <Box sx={{ width: 250 }}></Box>;

  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={state} onClose={() => wrapperSetState(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
