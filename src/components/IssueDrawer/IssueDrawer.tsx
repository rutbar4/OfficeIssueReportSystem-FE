import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerToolbar from './DrawerToolbar';
import IssueDetails from 'src/components/IssueDrawer/IssueDetails';
import { fetchIssueDetails } from './DetailFetcher';

const initialDetails = {
  name: "Loading...",
  description: "",
  status: "",
  rating: 0,
  dateCreated: "",
  employeeName: "",
  officeName: "",
}


export default function IssueDrawer({ wrapperSetDaitailsOpen, issueDetailsOpen, issueID }) {
  const [issueDetailData, setIssueDetailData] = useState(initialDetails);
  const handleDrawerOpen = () => {
      fetchIssueDetails(issueID)
        .then((data) => {
          console.log(data);
          setIssueDetailData(data);
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
    year: 'numeric'
  });

  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={issueDetailsOpen} onClose={() => wrapperSetDaitailsOpen(false)}>
          <DrawerToolbar wrapperSetDaitailsOpen={wrapperSetDaitailsOpen} />
          <Box sx={{ width: 660 , margin: 5}}>
          <IssueDetails title={issueDetailData.name} description={issueDetailData.description} reportedBy={issueDetailData.employeeName} reported={formattedDate} status={issueDetailData.status} upvotes={issueDetailData.rating} office={issueDetailData.officeName} />
            </Box>;
        </Drawer>
      </React.Fragment>
    </div>
  );
}
