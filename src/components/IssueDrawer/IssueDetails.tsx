import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button, Divider } from '@mui/material';

import UserChip from '../Chip/UserChip';
import UpvoteChip from '../Chip/UpvoteChip';

import StatusChip from 'src/components/Chip/StatusChip';
import Tabs from 'src/components/IssueDrawer/ModalTabs';
import StatusDropdown from 'src/components/IssueDrawer/StatusDropwdown';
import OfficeDropdown from 'src/components/IssueDrawer/OfficeDropdown';

const tableStyle = {
  border: 'none',
  fontSize: '14px',
  itemsAllign: 'left',
  padding: '3px',
  overFlow: 'hidden',
  Width: '10px',
};
const firstCellStyle = {
  color: '#B3B3B3',
  width: '170px',
};

interface issueDetailsProps {
  id: string;
  title: string;
  description: string;
  reportedBy: string;
  reported: string;
  status: string;
  upvotes: number;
  office: string;
  officeId: string;
}

function IssueDetails(props: issueDetailsProps) {
  const { id, title, description, reportedBy, reported, status, upvotes, office, officeId } = props;
  //-----------status
  const [statusDropdownAnchor, setStatusDropdownAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(status);
  useEffect(() => {
    // Set selectedStatus to the initial status when the component mounts
    setSelectedStatus(status);
  }, [status]); // Run this effect whenever the 'status' prop changes

  const handleStatusCellClick = (event) => {
    setStatusDropdownAnchor(event.currentTarget);
  };

  const handleStatusDropdownClose = () => {
    setStatusDropdownAnchor(null);
  };
  const handleStatusChange = (newStatus) => {
    setSelectedStatus((currentStatus) => (newStatus !== currentStatus ? newStatus : currentStatus));
  };
  //-----------
  const [officeDropdownAnchor, setOfficeDropdownAnchor] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(office);
  useEffect(() => {
    setSelectedOffice(office);
    setOfficeToSend(officeId); // Set officeToSend to the default officeId when office prop changes
  }, [office, officeId]);

  const [isOfficeChanged, setIsOfficeChanged] = useState(false);
  const [officeToSend, setOfficeToSend] = useState(officeId);

  const handleOfficeCellClick = (event) => {
    setOfficeDropdownAnchor(event.currentTarget);
  };

  const handleOfficeDropdownClose = () => {
    setOfficeDropdownAnchor(null);
  };

  const handleOfficeChange = (office) => {
    const selectedOfficeString = `${office.name}, ${office.country}`;
    setSelectedOffice(selectedOfficeString);
    setIsOfficeChanged(true);
    setOfficeDropdownAnchor(null);
    const newOfficeToSend = isOfficeChanged ? officeId : office.id;
    setOfficeToSend(newOfficeToSend);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
      <Typography variant="h1" sx={{ color: '#0E166E' }}>
        {title}
      </Typography>
      <Divider variant="middle" />
      <Table sx={{ tableLayout: 'fixed', width: 650 }}>
        <TableBody sx={{ border: 0 }}>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Reported by</TableCell>
            <TableCell style={tableStyle}>
              <UserChip
                userName={reportedBy}
                imageLink="https://images.unsplash.com/photo-1585837146751-a44118595680?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Reported</TableCell>
            <TableCell style={tableStyle}>{reported}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Status</TableCell>
            <TableCell style={tableStyle} onClick={handleStatusCellClick}>
              <StatusChip issueStatus={selectedStatus} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Upvotes</TableCell>
            <TableCell style={tableStyle}>
              <UpvoteChip count={upvotes} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Office</TableCell>
            <TableCell style={tableStyle} onClick={handleOfficeCellClick}>
              {selectedOffice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs description={description} office={officeToSend} status={selectedStatus} issueId={id} />
      <StatusDropdown
        statusOptions={['Open', 'In progress', 'Pending', 'Blocked', 'Resolved', 'Closed']}
        anchorEl={statusDropdownAnchor}
        onClose={handleStatusDropdownClose}
        onStatusChange={handleStatusChange}
      />
      <OfficeDropdown
        anchorEl={officeDropdownAnchor}
        onClose={handleOfficeDropdownClose}
        selectedOffice={selectedOffice}
        onOfficeChange={handleOfficeChange}
      />
    </Box>
  );
}

export default IssueDetails;
