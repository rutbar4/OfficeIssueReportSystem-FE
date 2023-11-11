import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import DrawerToolbar from './DrawerToolbar';
import { fetchIssueDetails } from '../../api/DetailApi';

import IssueDetails from 'src/components/IssueDrawer/IssueDetails';
import { deleteIssueById } from 'src/api/IssueDeleteApi';

const initialDetails = {
  name: 'Loading...',
  description: 'Loading...',
  status: 'Loading...',
  rating: 0,
  dateCreated: 'Loading...',
  employeeName: 'Loading...',
  officeName: 'Loading...',
};

// eslint-disable-next-line react/prop-types
export default function IssueDrawer({ wrapperSetDaitailsOpen, issueDetailsOpen, issueId }) {
  const [issueDetailData, setIssueDetailData] = useState(initialDetails);
  const handleDrawerOpen = () => {
    fetchIssueDetails(issueId).then((data) => {
      if (data != null) {
        setIssueDetailData(data);
      }
    });
  };
  useEffect(() => {
    if (issueDetailsOpen) {
      handleDrawerOpen();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            issueId={issueId}
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
              issueId={issueId}
            />
          </Box>
          ;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
