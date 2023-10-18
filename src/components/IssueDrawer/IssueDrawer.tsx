import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerToolbar from './DrawerToolbar';
import ModalContent from 'src/components/ModalContent';

export default function IssueDrawer({ wrapperSetDaitailsOpen, issueDetailsOpen }) {
  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={issueDetailsOpen} onClose={() => wrapperSetDaitailsOpen(false)}>
          <DrawerToolbar wrapperSetDaitailsOpen={wrapperSetDaitailsOpen} />
          <Box sx={{ width: 600 , margin: 5}}>
          <ModalContent title='Just some random testing words' reportedBy='Vardenis Pavardenis' reported='23 January 2023, 11:34' status='Open' upvotes={2} office='Kaunas, Lithuania' />
            </Box>;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
