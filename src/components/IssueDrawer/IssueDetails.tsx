import React, { useRef, useState } from 'react';
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
}

function IssueDetails(props: issueDetailsProps) {
  const { id, title, description, reportedBy, reported, status, upvotes, office } = props;
  const [statusDropdownAnchor, setStatusDropdownAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const [officeDropdownAnchor, setOfficeDropdownAnchor] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(office);
  const [isOfficeChanged, setIsOfficeChanged] = useState(false);
  const [officeId, setOfficeId] = useState('');

  // Add a ref for the "Office" table cell
  const officeCellRef = useRef(null);

  const handleStatusCellClick = (event) => {
    setStatusDropdownAnchor(event.currentTarget);
  };

  const handleStatusDropdownClose = () => {
    setStatusDropdownAnchor(null);
  };
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setIsStatusChanged(true);
  };

  const handleOfficeCellClick = (event) => {
    setOfficeDropdownAnchor(event.currentTarget);
  };

  const handleOfficeDropdownClose = () => {
    setOfficeDropdownAnchor(null);
  };

  const handleOfficeChange = (office) => {
    const selectedOfficeString = `${office.name}, ${office.country}`;
    setSelectedOffice(selectedOfficeString);
    setOfficeId(office.id);
    setIsOfficeChanged(true);
    setOfficeDropdownAnchor(null);
  };
  // Define a function to handle data from the Tabs component
  const handleTabsData = (data) => {
    // Do something with the data received from Tabs
    console.log('Data received from Tabs:', data);
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
              <StatusChip issueStatus={isStatusChanged ? selectedStatus : status} />
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
              {isOfficeChanged ? selectedOffice : office}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs description={description} office={selectedOffice} status={selectedStatus} issueId={id} />
      <StatusDropdown
        statusOptions={['Open', 'In progress', 'Pending', 'Blocked', 'Resolved', 'Closed']} // Replace with your status options
        anchorEl={statusDropdownAnchor}
        onClose={handleStatusDropdownClose}
        selectedStatus={selectedStatus}
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
