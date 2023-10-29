import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import DrawerToolbar from './DrawerToolbar';
import { fetchIssueDetails } from '../../api/DetailApi';

import IssueDetails from 'src/components/IssueDrawer/IssueDetails';

const initialDetails = {
  name: 'Loading...',
  description: 'Loading...',
  status: 'Loading...',
  rating: 0,
  dateCreated: 'Loading...',
  employeeName: 'Loading...',
  officeName: 'Loading...',
};

export default function IssueDrawer({ wrapperSetDaitailsOpen, issueDetailsOpen, issueID }) {
  const [issueDetailData, setIssueDetailData] = useState(initialDetails);
  const handleDrawerOpen = () => {
    fetchIssueDetails(issueID).then((data) => {
      if (data != null) {
        setIssueDetailData(data);
      }
    });
  };

  useEffect(() => {
    if (issueDetailsOpen) {
      handleDrawerOpen();
    }
  }, [issueDetailsOpen]);

  const date = new Date(issueDetailData.dateCreated);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  issueDetailData.dateCreated = formattedDate;

  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={issueDetailsOpen} onClose={() => wrapperSetDaitailsOpen(false)}>
          <DrawerToolbar
            issueID={issueID}
            title={issueDetailData.name}
            wrapperSetDaitailsOpen={wrapperSetDaitailsOpen}
          />
          <Box sx={{ width: 660, margin: 5 }}>
            <IssueDetails
              title={issueDetailData.name}
              description={issueDetailData.description}
              reportedBy={issueDetailData.employeeName}
              reported={issueDetailData.dateCreated}
              status={issueDetailData.status}
              upvotes={issueDetailData.rating}
              office={issueDetailData.officeName}
            />
          </Box>
          ;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
