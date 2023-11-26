import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';

import UserChip from '../Chip/UserChip';

import StatusChip from 'src/components/Chip/StatusChip';
import Tabs from 'src/components/IssueDrawer/ModalTabs';
import StatusDropdown from 'src/components/IssueDrawer/StatusDropdown';
import OfficeDropdown from 'src/components/IssueDrawer/OfficeDropdown';
import { RootState } from 'src/store/store';

import VoteToggleButton from '../IssueCard/IssueCardComponents/VoteToggleButton';
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
  employeeId: string;
  handleVoteCount: {};
  wasVoted: boolean;
  isError: boolean;
  setError: {};
  isVoted: boolean;
  setVoted: {};
  wrapperSetDaitailsOpen: any;
}
type role =
  | {
      value: string;
    }
  | string;

function IssueDetails(props: issueDetailsProps) {
   const { id,
    title,
    description,
    reportedBy,
    reported,
    status,
    upvotes,
    office, officeId, employeeId,
    handleVoteCount,
    wasVoted,
    isError,
    setError,
    isVoted,
    setVoted,
    wrapperSetDaitailsOpen,
  } = props;

  const [statusDropdownAnchor, setStatusDropdownAnchor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(status);
  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);
  const handleStatusCellClick = (event) => {
    if (isAdmin || employeeId === user?.id) {
      setStatusDropdownAnchor(event.currentTarget);
    }
  };
  const handleStatusDropdownClose = () => {
    setStatusDropdownAnchor(null);
  };
  const handleStatusChange = (newStatus) => {
    setSelectedStatus((currentStatus) => (newStatus !== currentStatus ? newStatus : currentStatus));
  };

  const [officeDropdownAnchor, setOfficeDropdownAnchor] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(office);
  useEffect(() => {
    setSelectedOffice(office);
    setOfficeToSend(officeId);
  }, [office, officeId]);
  const [isOfficeChanged, setIsOfficeChanged] = useState(false);
  const [officeToSend, setOfficeToSend] = useState(officeId);
  const handleOfficeCellClick = (event) => {
    if (isAdmin || employeeId === user?.id) {
      setOfficeDropdownAnchor(event.currentTarget);
    }
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

  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = (user?.roles as role[])?.includes('ADMIN') || false;

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
            <TableCell style={{  ...tableStyle, ...firstCellStyle  }}>Status</TableCell>
            <TableCell style={{ ...tableStyle, cursor: 'pointer' }} onClick={handleStatusCellClick}>
              <StatusChip issueStatus={selectedStatus} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Upvotes</TableCell>
            <TableCell style={tableStyle}>
              <VoteToggleButton
                issueId={props.id}
                key={props.id}
                handleVoteCount={handleVoteCount}
                put={upvotes}
                wasVoted={wasVoted}
                isError={isError}
                setError={setError}
                isVoted={isVoted}
                setVoted={setVoted}
              ></VoteToggleButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableStyle, ...firstCellStyle }}>Office</TableCell>
            <TableCell style={{ ...tableStyle, cursor: 'pointer' }} onClick={handleOfficeCellClick}>
              {selectedOffice}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs
        description={description}
        office={officeToSend}
        status={selectedStatus}
        issueId={id}
        employeeId={employeeId}
        wrapperSetDaitailsOpen={wrapperSetDaitailsOpen}
      />
      <StatusDropdown
        statusOptions={['Open', 'In progress', 'Pending', 'Blocked', 'Resolved', 'Closed']}
        anchorEl={statusDropdownAnchor}
        onClose={handleStatusDropdownClose}
        onStatusChange={handleStatusChange}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
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
